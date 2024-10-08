function deepClone(obj){
  if (obj === null || typeof obj !== 'object') return obj;
  let objClone = Array.isArray(obj) ? [] : {}
  if(obj && typeof obj === 'object'){
    for (key in obj){
      if(obj.hasOwnProperty(key)){
        if(obj[key] && typeof obj[key] === 'object'){
          objClone[key] = deepClone(obj[key])
        }else{
          objClone[key] = obj[key]
        }
      } 
    }
  }
  return objClone
}

const  a = 1
const b = deepClone(a)
console.log(a,b)

