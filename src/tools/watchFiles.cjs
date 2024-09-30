const chokidar = require('chokidar');  
const fs = require('fs');  
const path = require('path');  

const watchedDir = path.join(__dirname, '../components/dynamic/component'); 
const outputFilePath = path.join(__dirname, '../components/dynamic/fileList.ts'); 

function one(comp) {  
  const item = {
      cname: comp,
      icon: "<i class='fa fa-solid fa-plus'></i>"
    }
  return JSON.stringify(item, null, 4);
}

function generateFileList() {  
  let files = fs.readdirSync(watchedDir);  
  const fileList = files.map(file => {
    const cname = path.basename(file, path.extname(file));
    return one(cname);
  }).join(',\n');  
  files = "export const componentList = [\n".concat(fileList).concat("\n]\n")
  fs.writeFileSync(outputFilePath, files);
}  

const watcher = chokidar.watch(watchedDir, {  
  //ignored: /(^|[\/\\])\../, // 忽略点文件，如 .git, .DS_Store 等  
  ignore: (path, stats) => stats?.isFile() && !path.endsWith('.ts'), // only watch ts files
  persistent: true  
});  

watcher  
  .on('add', path => {  
    console.log(`File ${path} has been added`);  
    generateFileList();  
  })  
  .on('change', path => {  
    console.log(`File ${path} has been changed`);  
    generateFileList();  
  })  
  .on('unlink', path => {  
    console.log(`File ${path} has been removed`);  
    generateFileList();  
  });  

console.log(`Now watching ${watchedDir} for changes...`);  

// 初始化生成文件列表  
generateFileList();