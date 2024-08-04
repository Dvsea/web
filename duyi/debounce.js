/**
 * 要使debounce中func的this指向和调用的debounce参数func一致，return需返回普通function函数
 * ()=>{}没有this指向
 * 传入剩余参数，并传给内部func函数
 */
function debounce(func, duration = 500) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, duration)
  }
}

const handleResize = debounce(func,500)

window.onresize = handleResize