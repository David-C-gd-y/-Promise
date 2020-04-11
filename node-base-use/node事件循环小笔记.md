 node事件循环 有六个阶段 
 其中有三个阶段需要留意 

 poll , check , timer

 poll(轮询)  这个阶段主要是收集i/o， 执行i/o 相关的回调

 check 这个阶段只执行 setImmediate, 如果没有存在改调用， 则 直接等待timer

 timer  执行 setTimeout() 和 setInterval() 的调度回调函数

 process.nextTick 是一个例外，在每个阶段结束之前 都会最优先执行； nextTick 的回调执行，是会阻塞下一个阶段到来的时间；