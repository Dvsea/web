function fn(a, b, c, d) {
  console.log('fn called')
  console.log('args', a, b, c, d)
  console.log(this)
}


Function.prototype.myBind = function (ctx, ...agrs) {
  const fn = this
  return function (...subArgs) {
    const allArgs = [...agrs, ...subArgs]
    if (new target) {
      return new fn(...allArgs)
    } else {
      return fn.apply(ctx, allArgs)
    }
  }
}

// const newFn = fn.bind('ctx',1,2)
const newFn = fn.myBind('ctx', 1, 2)
newFn(3, 4)