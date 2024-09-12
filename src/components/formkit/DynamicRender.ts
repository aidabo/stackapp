import { h, defineComponent } from 'vue';
import { usePageComponents } from '@/components/layout/shared/usePageComponents';

export default defineComponent({  
  render() {      
    const { gsGetItemCompnent} = usePageComponents();
    const component = gsGetItemCompnent('example')
    return h(component, {  
      itemId: "2389434",  
      componentName: 'test000',
    });  
  }  
});