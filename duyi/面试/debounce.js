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

// function debounce(fn, delay) {
//   let timerId
//   return (...args) => {
//       clearTimeout(timerId)
//       timerId = setTimeout(() => fn(...args), delay)
//   }
// }

function handleResize() {
  console.log('Window resized');
}

const debouncedHandleResize = debounce(handleResize, 300);

window.addEventListener('resize', debouncedHandleResize);

// 示例函数：接收多个参数
function search(keyword, options) {
  console.log(`Searching for: ${keyword}`, options);
}

// 使用 debounce 函数包装 search 函数
const debouncedSearch = debounce(search, 300);

// 模拟用户输入
debouncedSearch('JavaScript', { caseSensitive: false });
debouncedSearch('JavaScript', { caseSensitive: false });
debouncedSearch('JavaScript', { caseSensitive: false });S