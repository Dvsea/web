/*
  *依次顺序执行一系列任务
  *所有任务全部完成后可以得到每个任务的执行结果
  *需要返回两个方法，start用于启动任务，pause用于暂停任务
  *每个任务具有原子性，即不可中断，只能在两个任务之间中断
  * @param {...Function} task 任务列表，每个任务无参、异步
*/

function processTasks(...tasks) {
  let isRunning = false
  const result = []  //每次执行任务的结果
  let i = 0 //当前任务执行下标 
  let prom = null //结果promise状态
  return {
    start() {
      return new Promise(async (resolve, reject) => {
        //成功或失败都结束
        if(prom){
          prom.then(resolve,reject)
          return 
        }
        if(isRunning){
          return 
        }
        isRunning = true
        while (i < tasks.length) {
          //当某一任务失败则跳出
          try {
            console.log('执行中')
            result.push(await tasks[i]())
            console.log('执行完成')
          } catch (error) {
            isRunning = false
            reject(error)
            prom = Promise.reject(error)
            return 
          }
          i++
          //中断
          if (!isRunning && i < tasks.length - 1) {
            console.log('执行被中断')
            return
          }

          //成功
          isRunning = false
          resolve(result)
          prom = Promise.resolve(result)
        }
      })
    },

    pause() {
      isRunning = false
    }
  }
}

