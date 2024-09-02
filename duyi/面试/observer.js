let observerIds = 0;
let observedIds = 0;

// 观察者类
class Observer {
  constructor() {
    this.id = observerIds++;
  }

  // 观测到变化后的处理
  update(subject) {
    console.log(`观察者${this.id} - 检测到被观察者${subject.id}变化`);
  }
}

// 被观察者类 (通常称为 Subject)
class Subject {
  constructor() {
    this.observers = [];
    this.id = observedIds++;
  }

  // 添加观察者
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  // 删除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter(o => o.id !== observer.id);
  }

  // 通知所有观察者
  notify() {
    this.observers.forEach(observer => observer.update(this));
  }
}

// 示例
const observer1 = new Observer();
const observer2 = new Observer();
const subject = new Subject();

subject.addObserver(observer1);
subject.addObserver(observer2);

// 模拟状态变化并通知观察者
subject.notify();

// 删除一个观察者并再次通知
subject.removeObserver(observer1);
subject.notify();
