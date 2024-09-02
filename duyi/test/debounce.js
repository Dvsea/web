function debounce(fn, delay) {
  let timerId
  return (...args) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => fn(...args), delay)
  }
}


//调用

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
debouncedSearch('JavaScript', { caseSensitive: false });