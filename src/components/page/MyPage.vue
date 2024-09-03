<template>
<div id="mySidenav" class="sidenav" :style="{width: pannelWidth + 'px'}">
    <a href="javascript:void(0)" class="closebtn " @click="closeNav()">&times;</a>
    <a href="#home"><i class="fa fa-fw fa-home"></i> Home</a>
    <a href="#services"><i class="fa fa-fw fa-wrench"></i> Services</a>    
</div>
  
  <!-- Use any element to open the sidenav -->
  <span @click="openNav()">open</span>
  
  <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
  <div id="main" :style="{marginLeft: pannelWidth + 'px'}">
    <grid-stack-layout></grid-stack-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GridStackLayout from "../layout/GridStackLayout.vue";

const pannelWidth = ref(0);

const openNav = () => {
  pannelWidth.value = 250;
}

const closeNav = () =>  {
  pannelWidth.value = 0;
}

</script>

<style scoped>

/* .sidewidth {
  width: 250px;
}

.mainmarginleft {
  width: 250px;
} */

/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 50px; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
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
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}


</style>