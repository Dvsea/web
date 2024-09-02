let fs = require('fs')
function read(file){
  return new Promise(function(resolev,reject){
    fs.readFile(file,'utf8',function(err,data){
      if(err) reject(err)
        resolev(data)
    })
  })
}

function *r(){
  let r1 = yield read('./test/1.txt')
  let r2 = yield read('./test/2.txt')
  let r3 = yield read(r2)
  console.log(r1)
  console.log(r2)
  console.log(r3)
}

let it = r()

let {value,done} = it.next()
value.then(function(data){
  console.log(data)
  let {value,done} = it.next()
  value.then(function(data){
    console.log(data)
  })
})