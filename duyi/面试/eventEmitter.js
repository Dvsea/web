//发布订阅
class EventEmitter {
  constructor() {
    this._events = {}; // 存储事件和回调函数
  }

  // 监听事件，触发时调用回调
  on(event, callback) {
    let callbacks = this._events[event] || [];
    callbacks.push(callback);
    this._events[event] = callbacks;
    return this;
  }

  // 停止监听事件
  off(event, callback) {
    let callbacks = this._events[event];
    this._events[event] = callbacks && callbacks.filter(fn => fn !== callback);
    return this;
  }

  // 触发事件，并把参数传给事件的处理函数
  emit(event, ...args) {
    const callbacks = this._events[event];
    if (callbacks) {
      callbacks.forEach(fn => fn.apply(null, args)); // 将参数传递给回调函数 <=> fn(...args)
    }
    return this;
  }

  // 为事件注册单次监听
  once(event, callback) {
    const wrapFunc = (...args) => {
      callback.apply(null, args);
      //<=> callback(...args)
      this.off(event, wrapFunc);
    };
    this.on(event, wrapFunc);
    return this;
  }
}

const emitter = new EventEmitter();

function onResponse(data) {
  console.log('Data received:', data);
}

emitter.on('response', onResponse);

emitter.emit('response', { success: true }); // 输出: Data received: { success: true }

emitter.off('response', onResponse);

emitter.emit('response', { success: true }); // 无输出

emitter.once('response', onResponse);

emitter.emit('response', { success: false }); // 输出: Data received: { success: false }
emitter.emit('response', { success: false }); // 无输出

