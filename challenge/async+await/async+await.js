let fs = require('mz/fs');
async function reade () {
  let content = await fs.readFile('name.txt', 'utf8');
  let r = await fs.readFile(content, 'utf8');
  return r;
}
reade().then(function (data) {
  console.log(data)
})

// async + await = generator + co;