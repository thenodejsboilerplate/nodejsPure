/**
 * setTimeout(),setInterval(), setImmediate(),process.nextTick();
 * setTimeout(),setInterval()实现原理与异步I/O比较类似，只是不需要I/0线程池的参与。调用setTimeout()或setInterval()创建的定时器会被插入到定时器观察者内部的一个红黑树种。 每次tick执行时，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间，如果超过，就形成一个事件，它的回调函数将立即执行
 * 
 * 未了解process.nextTick()前，许多人也许为了立即异步一个任务，会这样调用setTimeout()来达到所需的效果
 *  setTimeout(function(){
 *   //todo
 *  }, 0);
 * 
 * 定时器的精确度不够， 而事实上，采用定时器需要动用红黑树， 创建定时器对象和迭代等操作。而setTimeout（fn,0）的方式较为浪费性能。实际上，process.nextTick()方法的操作相对较为轻量；每次调用process.nextTick()方法，只会将回调函数放入队列中，在下一轮Tick时取出执行。定时器中采用红黑树的操作时间复杂度为0(lg(n)),nextTick()的时间复杂度为0（1）。相比较下，process.nextTick()更高效
 *
 * setImmediate()方法与process.nextTick()方法十分类似，都是将回调行数延迟执行。由于时间循环对观察者的检查是有先后顺序的，process.nextTick（）属于idle观察者，setImmediate()属于check观察者，在每一轮循环检查只能怪，idle观察者先于I/O观察者，I/0观察者先于check观察者
 * 在具体实现上，process.nextTick()的回调函数保存在一个数组中，setImmediate()的结果则保存在链表中，在行为上，pprocess.nextTick()在每轮循环中会将数组中的回调函数全部执行完，而setImmediate()在每轮循环中执行链表中的一个回调函数，实例如下
 * 
 * 执行顺序：
 * process.nextTick()  setImmediate()
 * 
 */
'use strict';
process.nextTick(function(){
  console.log('nextTick 延迟执行1');
});
process.nextTick(function(){
  console.log('nextTick 延迟执行2');
});

setImmediate(function(){
  console.log('setImmediate 延迟执行1');
  //进入下次循环
  process.nextTick(function(){
    console.log('强势插入');
  });
});

setImmediate(function(){
  console.log('setImmediate 延迟执行2');
});

console.log('normal exection');