import { h } from "vue"
import { ComponentA } from "@/components/test/ComponentRenderA"

function handleDrop() {  
    // This is not how you would typically do it in Vue  
    // But for illustration purposes, imagine we're somehow returning the vnode  
    // In reality, you would update state that triggers a re-render  
    // return h(ComponentA, {  
    //   bProps: { /* Props for ComponentB */ },  
    //   onCustomEvent: () => { console.log("this is event in ComponentA") },  
    //   bSlots: {  
    //     // Define slots here if ComponentB supports them  
    //   },  
    // });  
  }  