// require('./a');
/// 优先找 a 名称的文件， 如果不存在 才会找 a 命名的文件夹下面的
//  如果文件夹中有package。json ，会先找到 main的指向， 如果没找到，那就找 index 命名的 js 或者 json


// 第三方模块 会去当前目录下 查找node_modules 文件夹

require('b');
console.log(module.paths)
/**
  [
    'c:\\Users\\LZJ\\Desktop\\前端 进阶学习\\my-core\\challenge\\npm\\node_modules',
    'c:\\Users\\LZJ\\Desktop\\前端 进阶学习\\my-core\\challenge\\node_modules',
    'c:\\Users\\LZJ\\Desktop\\前端 进阶学习\\my-core\\node_modules',
    'c:\\Users\\LZJ\\Desktop\\前端 进阶学习\\node_modules',
    'c:\\Users\\LZJ\\Desktop\\node_modules',
    'c:\\Users\\LZJ\\node_modules',
    'c:\\Users\\node_modules',
    'c:\\node_modules'
  ]
*/