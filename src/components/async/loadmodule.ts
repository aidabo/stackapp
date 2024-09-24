// import camelCase from 'camelcase';

// export const useLoadModule = () => {

//   const loadAgGridSettings = async (dynamicPath, tableName, jsName, ext = "ts") => {
//     try {
//       // Dynamically import the TypeScript module
//       const moduleA = await import(
//         /* @vite-ignore */ `${dynamicPath}/${tableName}_${jsName}.${ext}`
//       );
//       return moduleA[`${tableName}_${jsName}`];
//     } catch (error) {
//       console.error("Error loading TypeScript module:", error);
//     }
//   };

//   const loadDataService = async (dynamicPath, tableName, ext = "ts") => {
//     try {
//       // Dynamically import the TypeScript module
//       const moduleA = await import(
//         /* @vite-ignore */ `${dynamicPath}/${tableName}.${ext}`
//       );
//       console.log("type of>>>>> " + typeof(moduleA));
//       var serviceName = camelCase(`use-${tableName}-store`);
      
//       return moduleA[serviceName];      
//     } catch (error) {
//       console.error("Error loading TypeScript module:", error);
//     }
//   };

//   return { loadAgGridSettings, loadDataService };
// };
