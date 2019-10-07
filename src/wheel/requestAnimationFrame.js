let requestAnimationFrame, cancelAnimationFrame

var vendors = ['webkit', 'moz', 'ms', 'o']
var lastTime = 0;

requestAnimationFrame = window.requestAnimationFrame
cancelAnimationFrame = window.cancelAnimationFrame

// 如果没有window.requestAnimationFrame, 则遍历各种浏览器前缀，检查是否有其他形式的该方法
// 如果有的话就将其统一定义为requestAnimationFrame
for (var i = 0; i < vendors.length && !window.requestAnimationFrame; i++) {
    window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
}
// 如果遍历没找到，则优雅降级，使用setTimeout
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        var curTime = new Date().getTime()
        // 尽可能接近60帧，也就是setTimeout的运行时间要小于16ms。因为60帧的屏幕，每隔
        // 16.7ms就要刷新一次，如果运行间隔小于此值，则可能在刷新的时刻恰好没执行，出现
        // 跳帧，curTime-lastTime是上次运行与这次执行的间隔，如果大于该值，则立即执行
        // 如果间隔小于16ms，则等下次屏幕刷新时再执行
        var timeToCall = Math.max(0, 16 - (curTime - lastTime))
        // 运行下面赋值的时候，后面的setTimeout函数就已经开始执行了，应该是先执行，再赋值
        var id = setTimeout(function () {
            // 注意这里也可以用的是return该callback函数，而不是直接执行，因为setTimeout
            // 接受的是一个回调函数，该函数传给timer，时间到了之后，会执行
            // return callback(curTime + timeToCall)
            // 在requestAnimationFrame中，调用回调时会传入timestamp参数即调用的时刻
            callback(curTime + timeToCall)
        }, timeToCall);

        return id
    }
}
// 自定义的cancel函数接受一个setTimeout返回的id，利用此id可以终止setTimeout
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
    }
}

export {requestAnimationFrame, cancelAnimationFrame}
