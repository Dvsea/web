/**
 * KOA 洋葱模型
 * addTask添加任务并执行
 * 传入next函数，调用时执行下一个任务，否则顺序执行
 */
class TaskPro {
  constructor() {
    this._taskList = []       //执行任务列表
    this._isRunning = false   //判断任务是否在进行,可能多次调用run()
    this._currentIndex = 0    //正在执行任务的索引
    this._next = async () => {
      this._currentIndex++
      await this._runTask()
    }
  }

  addTask(task) {
    this._taskList.push(task)
  }

  run() {
    if (this.isRunning || !this._taskList.length) {
      return
    }
    this._isRunning = true
    this._runTask()
  }

  /**
   * 取出一个任务执行
   */
  async _runTask() {
    if (this._currentIndex >= this._taskList.length) {
      this._reset()
      return
    }

    const startIndex = this._currentIndex
    const task = this._taskList[this._currentIndex]
    await task(this._next)
    const endIndex = this._currentIndex
    if (startIndex === endIndex) {  //没有传入next函数的时候,手动执行下一个任务
      await this._next()
    }
  }

  _reset() {
    this._currentIndex = 0
    this._taskList = []
    this.isRunning = false
  }
}

const t = new TaskPro()

t.addTask(async (next) => {
  console.log(1, 'start')
  await next()
  console.log(1, 'end')
})

t.addTask(() => {
  console.log(2)
})

t.addTask(() => {
  console.log(3)
})

t.run()

/**
 *1 start
  2
  3
  1 end
 */
