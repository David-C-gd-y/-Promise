let Promise = require("./promise");
let p = resolve => {
        setTimeout(() => {
            resolve("success");
        }, 1000);
};

new Promise((resolve, reject) => {
    p(resolve)
}).then(r => {
    console.log(r)
}, e => {
    console.log('e', e)
}).then(r => {
    console.log(2, r)
})
