<template>
    <div class="full-w px-4">
        <div class="full-w page">
            <div id="gridcon" class="grid-stack">
                <div class="drag2here">Drag to here </div>
                <slot name="stack" :grid="grid"></slot>
            </div>
        </div>
        <hr />
    </div>
</template>

<script setup lang="ts">
import { onMounted, h, render, inject, reactive, defineExpose, watch } from "vue";
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { Base64 } from "js-base64";
import { v4 as uuidv4 } from 'uuid';
import { usePageComponents } from "@/components/parts/usePageComponents";

const props = defineProps({
    gsPageParams: Object,
    editable: Boolean
})

const { getItemCompnent } = usePageComponents();

var grid: any = null; // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115

onMounted(async () => {    
    grid = GridStack.init({ // DO NOT user grid.value = GridStack.init(), see above
        float: true,
        cellHeight: "80",
        minRow: 1,
        acceptWidgets: true,
        removable: '#trash', // drag-out delete class
    });

    GridStack.setupDragIn('.newWidget', { appendTo: 'body', helper: 'clone' });

    //debug
    //addEvents(grid);

    function addWidgetComponentCB(item: any) {
        const itemEl = item.el
        const itemElContent = itemEl.querySelector('.grid-stack-item-content')

        //if widget added by drag or add button
        const newWidget = itemEl.className.match(/newWidget\s/)
        if (newWidget) {
            const gscomponent = itemElContent.getAttribute("gscomponent");
            if (!gscomponent) {
                alert("No componnent info found!, newWidget must set gscomponent attrbute as component info");
                return;
            }
            const gscomponentData = JSON.parse(Base64.decode(gscomponent));
            //set component data info to item to serialized to save
            item["gscomponent"] = gscomponentData;
        }
    }

    grid.on('added', function (event: any, items: any) {
        for (const item of items) {
            const itemEl = item.el
            const itemElContent = itemEl.querySelector('.grid-stack-item-content')
            let itemId = item.id || item._id
            if (!itemId) {
                itemId = item.id = item._id = uuidv4();
            }

            // Use Vue's render function to create the content
            // See https://vuejs.org/guide/extras/render-function.html#render-functions-jsx
            //      Supports: emit, slots, props, attrs, see onRemove event below

            //remove dragitem custom class
            itemEl.className = itemEl.className.replace(/dragNewItem/, "");

            //if create new widget
            addWidgetComponentCB(item);

            //get component info from item
            const gscomponentData = item["gscomponent"];
            //custom id
            const cid = uuidv4();
            gscomponentData["cid"] = cid;
            //gs item id
            gscomponentData["id"] = itemId;

            if (!gscomponentData) {
                console.log("No componnent data found!");
                return;
            }

            let component = getItemCompnent(gscomponentData.name);
            if (!component) {
                console.log("No componnent found!");
                return;
            }

            const itemContentVNode = h(
                component,
                {
                    itemId: "" + itemId,
                    cid: cid,
                    gsProps: gscomponentData.props,
                    gsInitData: gscomponentData.data,

                    onRemove: (itemId: any) => {
                        grid.removeWidget(itemEl)
                    },

                    onItemChanged: (props: any, gsItemData: any) => {
                        console.log("stackChanged emited called", props.itemId, gsItemData);
                        gscomponentData["data"] = gsItemData;
                    },

                    onSubmit: (itemId: any, gsItemData: any) => {
                        alert("submit emited called: " + itemId + " " + JSON.stringify(gsItemData));
                    }
                }
            )

            //clear dragged element content from .grid-stack-item-content div
            itemElContent.innerHTML = ""

            // Render the vue node into the item element
            render(itemContentVNode, itemElContent)
        }
    });

    grid.on('removed', function (event: any, items: any) {
        for (const item of items) {
            const itemEl = item.el
            const itemElContent = itemEl.querySelector('.grid-stack-item-content')
            // Unmount the vue node from the item element
            // Calling render with null will allow vue to clean up the DOM, and trigger lifecycle hooks
            render(null, itemElContent)
        }
    });

    grid.on('change', function (e: any, items: any) {
        // let str = '';
        // items = items || [];
        // (items || []).forEach(function (item) { str += ' (x,y)=' + item.x + ',' + item.y; });
        // console.log(e.type + ' ' + items.length + ' items:' + str);
        console.log("gs changed event***: ", e, items);
    });

});

// 2.x method - just saving list of widgets with content (default)
const load = (serializedData: any) => {
    if (!serializedData) return grid;
    grid.removeAll();
    grid.load(serializedData);
    return grid;
}

// 2.x method
const save = () => {
    let serializedData = grid.save();
    serializedData.map((item: any) => item["content"] = "")
    return serializedData;
}

const clear = () => {
    grid.removeAll();
}

const addNewWidget = () => {
    const node = grid.items[grid.items.length] || {
        x: Math.round(12 * Math.random()),
        y: Math.round(5 * Math.random()),
        w: Math.round(1 + 3 * Math.random()),
        h: Math.round(1 + 3 * Math.random()),
    };
    node.id = uuidv4();
    grid.addWidget(node);
}

const removeWidget = (el: any) => {
    el.remove();
    grid.removeWidget(el, false);
}

watch(props, ()=>{
    if(props.editable){
        console.log("watch event", props.editable, grid);
    }
}, { deep: true})

//expose function to parent
defineExpose({load, save, clear});

</script>

<style>
/** stack */

.drag2here {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    color: rgba(0, 0, 0, 0.3);
    padding: 30px;
}

.page .grid-stack-item-content {
    text-align: center;
    /* background-color: #18bc9c;  */
    background-color: rgba(255, 255, 255, 0.95);
    border: lightgray solid 1px;
 
}

.pagemain-edit .page .grid-stack-item-content {
    cursor: move;
}

.pagemain .page .grid-stack-item-content {
    cursor: default;
}

.page .grid-stack-item-removing {
    opacity: 0.5;
}

/* make nested grid have slightly darker bg take almost all space (need some to tell them apart) so items inside can have similar to external size+margin */
.grid-stack>.grid-stack-item.grid-stack-sub-grid>.grid-stack-item-content {
    background: rgba(0, 0, 0, 0.1);
    inset: 0 2px;
}

.grid-stack.grid-stack-nested {
    background: none;
    /* background-color: red; */
    /* take entire space */
    position: absolute;
    inset: 0;
    /* TODO change top: if you have content in nested grid */
}

/* Responsive Grid Layout */
@media (min-width: 768px) {
    .grid-stack {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 992px) {
    .grid-stack {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1200px) {
    .grid-stack {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>