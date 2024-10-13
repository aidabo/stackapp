import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import url from '@rollup/plugin-url';
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue'

export default defineConfig(({ /*command,*/ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))
  
  // Load env file based on `mode` in the current working directory
  // const proxy_host = process.env.VITE_APP_PROXY_HOST;
  // const baseUrl = process.env.VITE_APP_BASE_URL;

  return defineConfig({    
    //base: baseUrl, //not work for reload, just add base into index.html
    plugins: [      
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['xcustom-'].includes(tag),
          }
        }
      }),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),       
      AutoImport({
        resolvers: [ArcoResolver()],
      }),     
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      }),
      vitePluginForArco({
        style: 'css'
      }),
      url(),
      visualizer({
        emitFile: true,
        filename: "stats.html",
      }) as PluginOption,      
    ], //plugins

    build: {  
      lib: {  
        entry: 'src/components/layout/index.ts', // 指定入口文件  
        name: 'StackAppLayout', // 库的全局变量名  
        fileName: (format) => `stack-app-layout.${format}.js`, // 输出文件名格式  
      },  
      rollupOptions: {  
        // 确保外部化 Vue，以便库用户能够自行提供 Vue 版本  
        external: ['vue'],  
        output: {  
          globals: {  
            vue: 'Vue',  
          },  
          exports: 'named', // 将所有导出视为命名导出  
        },  
      },  
    },  

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        /** 在 Vue 3 中，默认情况下，Vue 打包为只包含运行时版本的代码，这意味着它不包含模板编译器。
         * 你可以通过配置别名来确保 import Vue from 'vue' 导入的是包含编译器的 Vue 版本。 */
        'vue': 'vue/dist/vue.esm-bundler.js'  
      },
      dedupe: [
        'vue'
      ]
    },
    
    // expose proxy host
    server: {
      cors: true,
      proxy: {
        //forward to json-server api
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "")
        },
        // //forward to postgrest api
        // "/pgapi": {
        //   target: `http://${proxy_host}:3000`,
        //   changeOrigin: true,
        //   secure: false,
        //   rewrite: (path) => path.replace(/^\/pgapi/, ""),
        // },
        // // forward to nginx
        // "/data": {
        //   target: `http://${proxy_host}`,
        //   changeOrigin: true,
        //   secure: false,
        //   //rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        // // forward to nginx
        // "/images": {
        //   target: `http://${proxy_host}`,
        //   changeOrigin: true,
        //   secure: false,
        //   //rewrite: (path) => path.replace(/^\/api/, ""),
        // },
      },
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // "/socket.io": {
      //   target: "ws://localhost:5173",
      //   ws: true,
      // },
    },

    // build: {
    //    rollupOptions: {
    //      external: [ "jquery" ]
    //    }
    // }
  })// return defineConfig

});
