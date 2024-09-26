<template>
    <div class="full-w px-4">
        <div class="grid justify-items-end">
            <div class="p-2">
                <a-space>
                    <a-button type="primary" @click="onCreatePage">
                        <template #icon>
                            <icon-plus />
                        </template>
                        <!-- Use the default slot to avoid extra spaces -->
                        <template #default>Create Page</template>
                    </a-button>
                </a-space>
            </div>
            <div>
                <CreatePageDialog ref="dialogRef" :show="showDialog" :done="doneDlg" :cancel="cancelDlg"></CreatePageDialog>
            </div>
        </div>
        <a-list>
            <a-list-item v-for="page in pages" :key="page.id">
                <a-list-item-meta>
                    <template #title>
                        <a-space>
                            <a v-if="!isEditable(page.id)" href="#" @click.prevent="onOpen(page.id)">{{ page.title }}</a>
                            <a-input v-else :style="{ width: '320px' }" @change="onChangeTitle" v-model="page.title" />
                            <a-button @click.prevent="onEnableEditable(page.id)"><icon-edit /></a-button>
                        </a-space>
                    </template>
                    <template #avatar>
                        <a-avatar shape="square">
                            <img alt="avatar"
                                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
                        </a-avatar>
                    </template>
                </a-list-item-meta>
                <template #actions>
                    <span @click.prevent="onEdit(page.id)"><icon-edit />編集</span>
                    <span @click.prevent="onDelete(page.id)"><icon-delete />削除</span>
                    <a-select :style="{width:'220px'}" placeholder="Please select ...">
                      <a-option :value="true">Change Category</a-option>
                    </a-select>
                </template>
            </a-list-item>
        </a-list>
    </div>
    
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"
import { useDefaultLayoutStore } from "@/components/dynamic/store/DefaultLayoutStore";
import { PageProps } from "@/components/layout/GridEvent";
import CreatePageDialog from "@/components/dialog/CreatePageDialog.vue"
import { v4 as uuidv4 } from 'uuid';

const { getPageList, savePage, getPageById, deletePage } = useDefaultLayoutStore();

const pages = ref(Array<PageProps>());

const editables: any = ref(null);

const showDialog = ref(false);

const dialogRef = ref(null);

const router = useRouter();

const loadList = async()=> {
    pages.value = await getPageList();  
    editables.value = pages.value.map((c:any) => {
        return { "id": c.id, "editable": false }
    })
}

onMounted(async () => {
    await loadList();
})

const isEditable = (pageid: string) => {
    if (editables.value.find((c: any) => c.id == pageid && c.editable)) {
        return true;
    } else {
        false;
    }
}

const onEnableEditable = (pageid: string) => {
    editables.value = editables.value.map((c: any) => {
        if (pageid && c.id == pageid) {
            c["editable"] = !c["editable"];
        } else {
            c["editable"] = false;
        }
        return c;
    })
}

const onChangeTitle = async (value: string, event: any) => {
    let editedPage = editables.value.find((c: any) => c.editable);
    if (editedPage) {
        let pageData: PageProps = await getPageById(editedPage.id);
        pageData.title = value;
        await savePage(pageData);
    }
    editedPage.editable = false;
}

const onCreatePage = () =>{
    showDialog.value = true;
}

const doneDlg = async(form: any) =>{
    if(form.title){
        form["id"] = `page_${uuidv4()}`;
        await savePage(form);        
    }    
    showDialog.value = false;
    await router.push({name: "createpage", params: {id: form.id}})
}

const cancelDlg = () => {
    showDialog.value = false;
}

const onEdit = async(pageId: string) => {
    await router.push({name: "createpage", params: {id: pageId}})
}

const onOpen = async(pageId: string) => {
    await router.push({name: "page", params: {id: pageId}})
}

const onDelete = async(pageId: string) => {
    await deletePage(pageId);
    await loadList();
}

</script>


<style scoped>
/* unvisited link */
a:link {
    color: blue;
}

/* visited link */
a:visited {
    color: green;
}

/* mouse over link */
a:hover {
    color: hotpink;
}

/* selected link */
a:active {
    color: blue;
}
</style>