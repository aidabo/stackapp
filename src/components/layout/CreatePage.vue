<template>
  <div id="pageSidenav" class="sidenav" :style="{ width: pannelWidth + 'px' }">
    <div class="flex">
      <div class="flex-none">
        <a href="#" class="mybtn" @click.prevent="publish()"><i class="fa fa-solid fa-square-share-nodes"></i></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="save()"><i class="fa fa-solid fa-save"></i></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="load()"><i class="fa fa-solid fa-refresh"></i></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="clear()"><i class="fa fa-solid fa-eraser"></i></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="close()"><i class="fa fa-solid fa-times"></i></a>
      </div>
    </div>

    <div>
      <div id="trash" style="padding: 5px; margin-bottom: 10px;" class="text-center text-white bg-amber-400 ">
        <div>
          <i class="fa fa-solid fa-trash" style="font-size: 200%"></i>
        </div>
        <div>
          <span>Drop here to remove!</span>
        </div>
      </div>

      <!-- <div v-for="item in gsComponentData" class="newWidget grid-stack-item dragNewItem" :key="item.name">
        <div class="grid-stack-item-content drag" :gscomponent="gsGetComponentInfo(item.name)">
          <div>
            <i class="fa fa-solid fa-plus" style="font-size: 200%"></i>
          </div>
          <div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div> -->

      <component-list></component-list>
    </div>

  </div>

  <div class="flex justify-between align-items-center bg-blue-600 text-white">
    <div class="ml-4 flex-1">
      <h1 class="m-1">
        <button class="text-stone-200 font-bold py-2 px-4 rounded  hover:text-white" @click.prevent="open">
          <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </button>
        <span class="ml-64 text-lg font-bold">{{ gsPageParams.title }}</span>
      </h1>
    </div>
    <div class="flex justify-between align-items-center">
      <!-- right -->
    </div>
  </div>

  <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
  <div class="pagemain-edit" :style="{ marginLeft: pannelWidth + 'px' }">
    <grid-stack-layout ref="gridRef" :gsPageParams="gsPageParams" :editable="editable"></grid-stack-layout>
    <div class="flex flex-col justify-end align-items-center mb-5">
      <div><textarea id="saved-data" style="width: 100%" cols="100" rows="5" readonly="true"></textarea></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import ComponentList from "@/components/layout/ComponentList.vue";
import GridStackLayout from "@/components/layout/GridStackLayout.vue";
import { createPageProps } from "@/store/pagelayout";
import { usePageLayoutStore } from "@/store/pagelayout";
// import { usePageComponents } from "@/components/layout/usePageComponents";

const gridRef = ref(null);

//route
const route = useRoute();

const router = useRouter();

//page parameters
const gsPageParams = ref(createPageProps());

const editable = ref(true);

//save page component & grid layout info
const { savePage, getPageById } = usePageLayoutStore();

//page parts component info & component 
//const { gsComponentData, gsComponents } = usePageComponents();

// const gsGetComponentInfo = (key: string) => {
//   return Base64.encode(JSON.stringify(gsComponentData.value.find(c => c.name == key)));
// }

const pannelWidth = ref(250);

onMounted(async () => {
  if (route.params.id) {
    gsPageParams.value = await getPageById((route.params as any).id);
    await load();
  }
})

const open = () => {
  pannelWidth.value = 250;
}

const close = () => {
  pannelWidth.value = 0;
}

const debugLog = (data: any) => {
  //@ts-ignore
  document.querySelector('#saved-data').value = JSON.stringify(data, null, '  ');
}

const load = async () => {
  //var data = localStorage.getItem(gsPageParams.value["id"]);
  const loadFun: Function = (gridRef.value as any).load;
  let data = await getPageById(gsPageParams.value["id"]);
  if (data) {
    debugLog(data);
    data["gsComponents"] = (data["gsComponents"] as any)?.map((item: any) => {
      delete item["locked"];
      delete item["noMove"];
      delete item["noResize"];
      return item;
    })
    gsPageParams.value = data;
    loadFun(gsPageParams.value["gsComponents"]);
  } else {
    return [
      loadFun({ id: 1, x: 2, y: 1, h: 2 }),
    ];
  }
}

const save = async () => {
  const saveFun: Function = (gridRef.value as any).save;
  let data = saveFun();
  //data = data.map((item:any)=>{ item.locked = 'yes'; item.noMove = true; return item;});
  gsPageParams.value["gsComponents"] = data;
  //localStorage.setItem(gsPageParams.value.id,  JSON.stringify(gsPageParams.value));
  await savePage(gsPageParams.value);
  console.log("saved: ", gsPageParams.value);
  debugLog(gsPageParams.value);
  return true;
}

const clear = async () => {
  const clearFun: Function = (gridRef.value as any).clear;
  clearFun();
}

const publish = async () => {
  const id = gsPageParams.value["id"];
  await router.push({ name: "page", params: { id: id } })
}

</script>

<style>
/* The side navigation menu */
.sidenav {
  height: 100%;
  /* 100% Full-height */
  width: 0;
  /* 0 width - change this with JavaScript */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Stay on top */
  /* top: 50px; */
  /* Stay at the top */
  left: 0;
  background-color: black;
  /* Black*/
  overflow-x: hidden;
  /* Disable horizontal scroll */
  /* padding-top: 80px; */
  /* Place content 60px from the top */
  transition: 0.5s;
  /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 16px;
  text-decoration: none;
  font-size: 25px;
  color: rgb(29, 31, 31, 0.1);
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 1.5rem;
  margin-left: 50px;
  color: #b1b1b1;
}

/* Position and style the close button (top right corner) */
.sidenav .mybtn {
  /* position: absolute; */
  top: 0;
  font-size: 1.5rem;
  /* margin-left: 15px; */
  color: #b1b1b1;
  padding-top: 0.90rem;
  padding-bottom: 0.90rem;
}

.openbtn {
  font-size: 1.5rem;
  margin-left: 15px;
}

.fa-arrow-circle-right:hover {
  color: white;
}

.pagetitle {
  font-size: 1.5rem;
  margin-left: 300px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
.pagemain-edit {
  transition: margin-left .5s;
  padding: 20px;
}


.trash {
  height: 100px;
  background: rgba(255, 0, 0, 0.1) center center url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDQzOC41MjkgNDM4LjUyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUyOSA0MzguNTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxNy42ODksNzUuNjU0Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2OC02LjU2My0yLjU2OGgtODguMjI0TDMwMi45MTcsMjUuNDFjLTIuODU0LTcuMDQ0LTcuOTk0LTEzLjA0LTE1LjQxMy0xNy45ODkgICAgQzI4MC4wNzgsMi40NzMsMjcyLjU1NiwwLDI2NC45NDUsMGgtOTEuMzYzYy03LjYxMSwwLTE1LjEzMSwyLjQ3My0yMi41NTQsNy40MjFjLTcuNDI0LDQuOTQ5LTEyLjU2MywxMC45NDQtMTUuNDE5LDE3Ljk4OSAgICBsLTE5Ljk4NSw0Ny42NzZoLTg4LjIyYy0yLjY2NywwLTQuODUzLDAuODU5LTYuNTY3LDIuNTY4Yy0xLjcwOSwxLjcxMy0yLjU2OCwzLjkwMy0yLjU2OCw2LjU2N3YxOC4yNzQgICAgYzAsMi42NjQsMC44NTUsNC44NTQsMi41NjgsNi41NjRjMS43MTQsMS43MTIsMy45MDQsMi41NjgsNi41NjcsMi41NjhoMjcuNDA2djI3MS44YzAsMTUuODAzLDQuNDczLDI5LjI2NiwxMy40MTgsNDAuMzk4ICAgIGM4Ljk0NywxMS4xMzksMTkuNzAxLDE2LjcwMywzMi4yNjQsMTYuNzAzaDIzNy41NDJjMTIuNTY2LDAsMjMuMzE5LTUuNzU2LDMyLjI2NS0xNy4yNjhjOC45NDUtMTEuNTIsMTMuNDE1LTI1LjE3NCwxMy40MTUtNDAuOTcxICAgIFYxMDkuNjI3aDI3LjQxMWMyLjY2MiwwLDQuODUzLTAuODU2LDYuNTYzLTIuNTY4YzEuNzA4LTEuNzA5LDIuNTctMy45LDIuNTctNi41NjRWODIuMjIxICAgIEM0MjAuMjYsNzkuNTU3LDQxOS4zOTcsNzcuMzY3LDQxNy42ODksNzUuNjU0eiBNMTY5LjMwMSwzOS42NzhjMS4zMzEtMS43MTIsMi45NS0yLjc2Miw0Ljg1My0zLjE0aDkwLjUwNCAgICBjMS45MDMsMC4zODEsMy41MjUsMS40Myw0Ljg1NCwzLjE0bDEzLjcwOSwzMy40MDRIMTU1LjMxMUwxNjkuMzAxLDM5LjY3OHogTTM0Ny4xNzMsMzgwLjI5MWMwLDQuMTg2LTAuNjY0LDguMDQyLTEuOTk5LDExLjU2MSAgICBjLTEuMzM0LDMuNTE4LTIuNzE3LDYuMDg4LTQuMTQxLDcuNzA2Yy0xLjQzMSwxLjYyMi0yLjQyMywyLjQyNy0yLjk5OCwyLjQyN0gxMDAuNDkzYy0wLjU3MSwwLTEuNTY1LTAuODA1LTIuOTk2LTIuNDI3ICAgIGMtMS40MjktMS42MTgtMi44MS00LjE4OC00LjE0My03LjcwNmMtMS4zMzEtMy41MTktMS45OTctNy4zNzktMS45OTctMTEuNTYxVjEwOS42MjdoMjU1LjgxNVYzODAuMjkxeiIgZmlsbD0iI2ZmOWNhZSIvPgoJCTxwYXRoIGQ9Ik0xMzcuMDQsMzQ3LjE3MmgxOC4yNzFjMi42NjcsMCw0Ljg1OC0wLjg1NSw2LjU2Ny0yLjU2N2MxLjcwOS0xLjcxOCwyLjU2OC0zLjkwMSwyLjU2OC02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTktNC44NTMtMi41NjgtNi41NjdjLTEuNzE0LTEuNzA5LTMuODk5LTIuNTY1LTYuNTY3LTIuNTY1SDEzNy4wNGMtMi42NjcsMC00Ljg1NCwwLjg1NS02LjU2NywyLjU2NSAgICBjLTEuNzExLDEuNzE0LTIuNTY4LDMuOTA0LTIuNTY4LDYuNTY3djE2NC40NTRjMCwyLjY2OSwwLjg1NCw0Ljg1MywyLjU2OCw2LjU3QzEzMi4xODYsMzQ2LjMxNiwxMzQuMzczLDM0Ny4xNzIsMTM3LjA0LDM0Ny4xNzJ6IiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTIxMC4xMjksMzQ3LjE3MmgxOC4yNzFjMi42NjYsMCw0Ljg1Ni0wLjg1NSw2LjU2NC0yLjU2N2MxLjcxOC0xLjcxOCwyLjU2OS0zLjkwMSwyLjU2OS02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTItNC44NTMtMi41NjktNi41NjdjLTEuNzA4LTEuNzA5LTMuODk4LTIuNTY1LTYuNTY0LTIuNTY1aC0xOC4yNzFjLTIuNjY0LDAtNC44NTQsMC44NTUtNi41NjcsMi41NjUgICAgYy0xLjcxNCwxLjcxNC0yLjU2OCwzLjkwNC0yLjU2OCw2LjU2N3YxNjQuNDU0YzAsMi42NjksMC44NTQsNC44NTMsMi41NjgsNi41N0MyMDUuMjc0LDM0Ni4zMTYsMjA3LjQ2NSwzNDcuMTcyLDIxMC4xMjksMzQ3LjE3MnogICAgIiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTI4My4yMiwzNDcuMTcyaDE4LjI2OGMyLjY2OSwwLDQuODU5LTAuODU1LDYuNTctMi41NjdjMS43MTEtMS43MTgsMi41NjItMy45MDEsMi41NjItNi41N1YxNzMuNTgxICAgIGMwLTIuNjYzLTAuODUyLTQuODUzLTIuNTYyLTYuNTY3Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2NS02LjU3LTIuNTY1SDI4My4yMmMtMi42NywwLTQuODUzLDAuODU1LTYuNTcxLDIuNTY1ICAgIGMtMS43MTEsMS43MTQtMi41NjYsMy45MDQtMi41NjYsNi41Njd2MTY0LjQ1NGMwLDIuNjY5LDAuODU1LDQuODUzLDIuNTY2LDYuNTdDMjc4LjM2NywzNDYuMzE2LDI4MC41NSwzNDcuMTcyLDI4My4yMiwzNDcuMTcyeiIgZmlsbD0iI2ZmOWNhZSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=) no-repeat;
}

.sidebar {
  background: rgba(0, 255, 0, 0.1);
  padding: 25px 0;
  height: 100px;
  text-align: center;
}

.sidebar .grid-stack-item {
  width: 120px;
  height: 50px;
  text-align: center;
  line-height: 35px;
  background: rgba(0, 255, 0, 0.1);
  cursor: default;
  display: inline-block;
}

.sidebar .grid-stack-item .grid-stack-item-content {
  /* background: none; */
  text-align: center;
  background-color: #18bc9c;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}

.grid-stack-item-removing {
  opacity: 0.8;
  filter: blur(5px);
}

#trash {
  background: rgba(255, 0, 0, 0.4);
  padding: 15px;
}

.dragNewItem {
  background-color: #18bc9c;
  text-align: center;
  justify-content: center;
  margin-bottom: 2px;
}
</style>