// generateAsyncComponents.js  
const fs = require('fs');  
const path = require('path');  
  
const componentsDir = path.resolve(__dirname, './components/formkit');  
const outputFile = path.resolve(__dirname, './components/async/asyncComponents.js');  
  
const asyncComponents = {};  
  
// 读取目录并生成动态导入  
fs.readdirSync(componentsDir).forEach(file => {  
  if (file.endsWith('.vue')) {  
    const componentName = file.replace(/\.vue$/, '');  
    const fullPath = path.resolve(componentsDir, file);  
    console.log(fullPath, componentName);
  
    // 注意：这里使用的是相对路径，Vite 会处理它  
    asyncComponents[componentName] = () => import(`@/components/async/${file}`);  
  }  
});  
  
console.log(asyncComponents);

// 将映射写入文件  
fs.writeFileSync(outputFile, `export default ${JSON.stringify(asyncComponents, null, 2)}`);
