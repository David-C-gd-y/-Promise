   require
   mod.require(path);
   Module._load  =》 模块加载
   Module._resolveFilename =》 解析文件名 获取文件路径
   Module._cache =》 做一个模块的缓存  没有缓存就创建模块
   new Module(filename, parent); =》 如果不存在 就创建模块， id = 文件名 exports = 当前的空对象

   Module._cache[filename] = module; // 创建完成以后，把模块缓存起来

    tryModule._cache 尝试加载模块

  ```
    let threw = true;
      try {
        module.load(filename);
        threw = false;
      } finally {
        if (threw) {
          delete Module._cache[filename];
          if (parent !== undefined) {
            delete relativeResolveCache[relResolveCacheIdentifier];
          }
        }
      }
  ```

    获取扩展名
    Module._extensions 真正的加载模块 .js .json .node .mjs 这几类文件
  ```
      const extension = findLongestRegisteredExtension(filename);
      Module._extensions[extension](this, filename); //
     
      Module._extensions['.js'] = function(module, filename) {
        const content = fs.readFileSync(filename, 'utf8');
        // 核心就是 fs.readFileSync(filename, 'utf8');
        module._compile(stripBOM(content), filename);
      };

  ```


   module._compile  给模块添加闭包

   Module.wrap  在旧版本的 node中 用下面这种方法给 模块包装
   ```
 
   let wrap = function(script) {
        // 将提取到的 文件内容字符串， 直接传入 这个函数， 然后 使用拼接字符串的方式来，包装整个文件。
     return Module.wrapper[0] + script + Module.wrapper[1];
    };

    const wrapper = [
      '(function (exports, require, module, __filename, __dirname) { ',
      '\n});'
    ];
    Object.defineProperty(Module, 'wrap', {
      get() {
        return wrap;
      },

      set(value) {
        patched = true;
        wrap = value;
      }
    });
   ```
  // 在node 新版本， 我现在使用的是 node 12 用的是 
   const { compileFunction } = internalBinding('contextify');
    使用 c++ internalBinding 原生的模块来包装 模块
    https://www.jianshu.com/p/a8f5a8cdc6ab 
    