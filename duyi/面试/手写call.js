Function.prototype.myCall = function (ctx, ...args) {
  // 如果当前调用的对象不是函数，则抛出错误
  if (typeof this !== 'function') {
    throw new TypeError(this + ' is not a function');
  }
  ctx = (ctx === undefined || ctx === null) ? globalThis : Object(ctx)  //判断环境
  const key = Symbol()
  //this 代表当前调用 myCall 的对象。在 Function.prototype.myCall 中，this 应该是一个函数。
  ctx[key] = this
  const r = ctx[key](...args)
  delete ctx[key]
  return r
}

function method(a, b) {
  console.log(a, b)
  console.log(this)
}

const obj = {
  a:1
}
method.myCall(obj, 2, 5)