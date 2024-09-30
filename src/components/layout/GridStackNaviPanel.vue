<template>
  <div id="pageSidenav" class="sidenav" :style="{ width: pannelWidth + 'px' }">
    <!-- panel button action -->
    <div class="flex">
      <div class="flex-none">
        <a href="#" class="mybtn" @click.prevent="props.publish()"
          ><i class="fa fa-solid fa-square-share-nodes"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="props.save()"
          ><i class="fa fa-solid fa-save"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="props.load()"
          ><i class="fa fa-solid fa-refresh"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="props.clear()"
          ><i class="fa fa-solid fa-eraser"></i
        ></a>
      </div>
      <div class="flex-initial">
        <a href="#" class="mybtn" @click.prevent="props.close()"
          ><i class="fa fa-solid fa-arrow-left"></i
        ></a>
      </div>
    </div>

    <!-- remove component panel-->
    <div
      id="trash"
      style="padding: 5px; margin-bottom: 10px"
      class="text-center text-white bg-amber-400"
    >
      <div>
        <i class="fa fa-solid fa-trash" style="font-size: 250%"></i>
      </div>
      <div class="py-5">
        <span>Drop here to remove!</span>
      </div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto"
    >
      <div
        v-for="(item, index) in gsComponents"
        :key="index"
        class="newWidget grid-stack-item grid-custom"
      >
        <div class="grid-stack-item-content drag" :gscomponent="item.cname">
          <div>
            <i class="fa fa-solid fa-plus" style="font-size: 200%"></i>
          </div>
          <div class="h-10">
            <span class="size-8 my-4">{{ item.cname }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { componentList } from "@/components/dynamic/fileList";

const props = defineProps({
  pannelWidth: {
    type: Number,
    required: true,
  },
  publish: {
    type: Function,
    required: true,
  },
  save: {
    type: Function,
    required: true,
  },
  load: {
    type: Function,
    required: true,
  },
  clear: {
    type: Function,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});

const gsComponents = ref<any>([]);

onMounted(() => {
  gsComponents.value = componentList;
});
</script>

<style scoped>
/* The side navigation menu */
.sidenav {
  height: 95%;
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
  overflow-y: auto;
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
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.trash {
  height: 120px;
  background: rgba(255, 0, 0, 0.1) center center
    url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDQzOC41MjkgNDM4LjUyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUyOSA0MzguNTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxNy42ODksNzUuNjU0Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2OC02LjU2My0yLjU2OGgtODguMjI0TDMwMi45MTcsMjUuNDFjLTIuODU0LTcuMDQ0LTcuOTk0LTEzLjA0LTE1LjQxMy0xNy45ODkgICAgQzI4MC4wNzgsMi40NzMsMjcyLjU1NiwwLDI2NC45NDUsMGgtOTEuMzYzYy03LjYxMSwwLTE1LjEzMSwyLjQ3My0yMi41NTQsNy40MjFjLTcuNDI0LDQuOTQ5LTEyLjU2MywxMC45NDQtMTUuNDE5LDE3Ljk4OSAgICBsLTE5Ljk4NSw0Ny42NzZoLTg4LjIyYy0yLjY2NywwLTQuODUzLDAuODU5LTYuNTY3LDIuNTY4Yy0xLjcwOSwxLjcxMy0yLjU2OCwzLjkwMy0yLjU2OCw2LjU2N3YxOC4yNzQgICAgYzAsMi42NjQsMC44NTUsNC44NTQsMi41NjgsNi41NjRjMS43MTQsMS43MTIsMy45MDQsMi41NjgsNi41NjcsMi41NjhoMjcuNDA2djI3MS44YzAsMTUuODAzLDQuNDczLDI5LjI2NiwxMy40MTgsNDAuMzk4ICAgIGM4Ljk0NywxMS4xMzksMTkuNzAxLDE2LjcwMywzMi4yNjQsMTYuNzAzaDIzNy41NDJjMTIuNTY2LDAsMjMuMzE5LTUuNzU2LDMyLjI2NS0xNy4yNjhjOC45NDUtMTEuNTIsMTMuNDE1LTI1LjE3NCwxMy40MTUtNDAuOTcxICAgIFYxMDkuNjI3aDI3LjQxMWMyLjY2MiwwLDQuODUzLTAuODU2LDYuNTYzLTIuNTY4YzEuNzA4LTEuNzA5LDIuNTctMy45LDIuNTctNi41NjRWODIuMjIxICAgIEM0MjAuMjYsNzkuNTU3LDQxOS4zOTcsNzcuMzY3LDQxNy42ODksNzUuNjU0eiBNMTY5LjMwMSwzOS42NzhjMS4zMzEtMS43MTIsMi45NS0yLjc2Miw0Ljg1My0zLjE0aDkwLjUwNCAgICBjMS45MDMsMC4zODEsMy41MjUsMS40Myw0Ljg1NCwzLjE0bDEzLjcwOSwzMy40MDRIMTU1LjMxMUwxNjkuMzAxLDM5LjY3OHogTTM0Ny4xNzMsMzgwLjI5MWMwLDQuMTg2LTAuNjY0LDguMDQyLTEuOTk5LDExLjU2MSAgICBjLTEuMzM0LDMuNTE4LTIuNzE3LDYuMDg4LTQuMTQxLDcuNzA2Yy0xLjQzMSwxLjYyMi0yLjQyMywyLjQyNy0yLjk5OCwyLjQyN0gxMDAuNDkzYy0wLjU3MSwwLTEuNTY1LTAuODA1LTIuOTk2LTIuNDI3ICAgIGMtMS40MjktMS42MTgtMi44MS00LjE4OC00LjE0My03LjcwNmMtMS4zMzEtMy41MTktMS45OTctNy4zNzktMS45OTctMTEuNTYxVjEwOS42MjdoMjU1LjgxNVYzODAuMjkxeiIgZmlsbD0iI2ZmOWNhZSIvPgoJCTxwYXRoIGQ9Ik0xMzcuMDQsMzQ3LjE3MmgxOC4yNzFjMi42NjcsMCw0Ljg1OC0wLjg1NSw2LjU2Ny0yLjU2N2MxLjcwOS0xLjcxOCwyLjU2OC0zLjkwMSwyLjU2OC02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTktNC44NTMtMi41NjgtNi41NjdjLTEuNzE0LTEuNzA5LTMuODk5LTIuNTY1LTYuNTY3LTIuNTY1SDEzNy4wNGMtMi42NjcsMC00Ljg1NCwwLjg1NS02LjU2NywyLjU2NSAgICBjLTEuNzExLDEuNzE0LTIuNTY4LDMuOTA0LTIuNTY4LDYuNTY3djE2NC40NTRjMCwyLjY2OSwwLjg1NCw0Ljg1MywyLjU2OCw2LjU3QzEzMi4xODYsMzQ2LjMxNiwxMzQuMzczLDM0Ny4xNzIsMTM3LjA0LDM0Ny4xNzJ6IiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTIxMC4xMjksMzQ3LjE3MmgxOC4yNzFjMi42NjYsMCw0Ljg1Ni0wLjg1NSw2LjU2NC0yLjU2N2MxLjcxOC0xLjcxOCwyLjU2OS0zLjkwMSwyLjU2OS02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTItNC44NTMtMi41NjktNi41NjdjLTEuNzA4LTEuNzA5LTMuODk4LTIuNTY1LTYuNTY0LTIuNTY1aC0xOC4yNzFjLTIuNjY0LDAtNC44NTQsMC44NTUtNi41NjcsMi41NjUgICAgYy0xLjcxNCwxLjcxNC0yLjU2OCwzLjkwNC0yLjU2OCw2LjU2N3YxNjQuNDU0YzAsMi42NjksMC44NTQsNC44NTMsMi41NjgsNi41N0MyMDUuMjc0LDM0Ni4zMTYsMjA3LjQ2NSwzNDcuMTcyLDIxMC4xMjksMzQ3LjE3MnogICAgIiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTI4My4yMiwzNDcuMTcyaDE4LjI2OGMyLjY2OSwwLDQuODU5LTAuODU1LDYuNTctMi41NjdjMS43MTEtMS43MTgsMi41NjItMy45MDEsMi41NjItNi41N1YxNzMuNTgxICAgIGMwLTIuNjYzLTAuODUyLTQuODUzLTIuNTYyLTYuNTY3Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2NS02LjU3LTIuNTY1SDI4My4yMmMtMi42NywwLTQuODUzLDAuODU1LTYuNTcxLDIuNTY1ICAgIGMtMS43MTEsMS43MTQtMi41NjYsMy45MDQtMi41NjYsNi41Njd2MTY0LjQ1NGMwLDIuNjY5LDAuODU1LDQuODUzLDIuNTY2LDYuNTdDMjc4LjM2NywzNDYuMzE2LDI4MC41NSwzNDcuMTcyLDI4My4yMiwzNDcuMTcyeiIgZmlsbD0iI2ZmOWNhZSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)
    no-repeat;
}

/* .sidebar {
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
  text-align: center;
} */

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

.grid-custom {
  background-color: rgba(74, 190, 89, 0.9);
  text-align: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.component-list-height {
  height: 80lvh;
}
</style>
