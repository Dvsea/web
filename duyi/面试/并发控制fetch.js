// fetch已实现，可直接使用
// 向url发起请求，返回一个Promise
// fetch(url:string)=>Promise

// 请你实现一个函数，控制并发请求数量，接受两个参数
// urls:string[]  待请求的url
// k:number  并发请求数量

function limitedConcurrentRequests(urls, k) {
  const results = new Array(urls.length); // 存储每个请求的结果
  let activeCount = 0; // 当前活动请求数量
  let i = 0; // 下一个要处理的请求索引

  return new Promise((resolve, reject) => {
    function next() {
      if (i === urls.length && activeCount === 0) {
        resolve(results); // 当所有请求完成时，返回结果
        return;
      }

      while (activeCount < k && i < urls.length) {
        const index = i++;
        activeCount++;
        fetch(urls[index])
          .then(res => res.json())
          .then(data => {
            results[index] = data;
          })
          .catch(error => {
            results[index] = { error };
          })
          .finally(() => {
            activeCount--; // 请求完成后，减少活动请求数量
            next(); // 递归调用以启动下一个请求
          });
      }
    }

    next(); // 启动初始请求
  });
}

// 示例调用
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/posts/4',
  'https://jsonplaceholder.typicode.com/posts/5'
];

limitedConcurrentRequests(urls, 2).then(results => {
  console.log(results);
});
