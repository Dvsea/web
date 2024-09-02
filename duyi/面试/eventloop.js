console.time('start')

setTimeout(() => {
  console.log(2)
}, 10);

setImmediate(()=>{
  console.log(1)
})

new Promise(function(resolve){
  console.log(3)
  resolve()
  // return resolve(4)
  console.log(4)
}).then(function(res){
  console.log(5)
  console.log(res)
  console.timeEnd('start')
})

console.log(6)

process.nextTick(function(){
  console.log(7)
})

console.log(8)