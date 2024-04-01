//防抖函数
export function debounce(func, delay) {

    if (typeof func !== 'function') {
        throw new Error('func not a function')
    }

    // 这里使用了闭包，所以 timer 不会轻易被销毁
    let timeout = null

    // 生成一个新的函数并返回
    return function (...args) {
        // 清空定时器
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        // 重新启动定时器
        timeout = setTimeout(() => {
            func.call(this, ...args)
        }, delay)
    }
}

//交叉观察器，用于监听元素出现在页面可是区域或完全在可视区域消失
export function interObserver(func, options) {
    return new IntersectionObserver(func(entries),options);
}

// entries => {
//     entries.forEach(item => {
//         if (item.isIntersecting) {
//             // console.dir(item.target.getAttribute('classification'))
//             let type = item.target.getAttribute('classification')
//             axios.get('http://192.168.0.104:8080/getVideoList?type=' + type).then(res => {
//                 console.log(res.data)
//                 this.data.classificationList[type].videoList = res.data
//             },
//                 err => {
//                     console.log(err)
//                 })
//             this.observer.unobserve(item.target)
//         }
//     }