import Vue from 'vue'
import Message from '@/components/Common/Message'
let MsgConstructor = Vue.extend(Message) // 生成vc的构造函数
let instant
let upInstants = []
let downInstants = []

let seed = 999
const Msg = (options) => {

    let id = "message_" + seed++ // 给每个vc 绑定唯一id

    setImmediate(() => {
        if (typeof options === 'string') {
            options = {
                msg: options
            }
        }
        // let userOnClose = options.onClose //用户传的关闭时的回调函数
        options.onClose = function () { //触发定时器结束关闭消息的回调，在这里可移除数组intstants中关闭的消息
            Msg.close(id, options.onClose, options.bottom ? 'up' : 'down')
        }
        instant = new MsgConstructor({ // 构造一个vc实例对象(生成一条消息)
            data: options
        })

        instant.id = id

        instant.$mount()                        //将实例挂到index.html中的body下

        if (options.container) {
            instant.position = 'absolute'
            options.container.appendChild(instant.$el)
        } else {
            document.body.appendChild(instant.$el)
        }

        if (options.top || (!options.top && !options.bottom)) {

            let top = options.top || 20

            if (!instant.cover) {
                downInstants.forEach(item => {
                    if (item.$el.offsetHeight && (item.top || (!item.top && !item.bottom)))
                        top += item.$el.offsetHeight + 12
                }) // 设置style的top值
            }

            instant.top = top
            downInstants.push(instant)
        } else if (options.bottom) {
            let bottom = options.bottom || 20

            if (!instant.cover) {
                upInstants.forEach(item => {
                    if (item.$el.offsetHeight) {
                        bottom += item.$el.offsetHeight + 12
                    }
                }) // 设置style的top值
            }
            instant.animation = 'bottom-to-top'
            instant.bottom = bottom
            upInstants.push(instant)
        }

        if (options.right || options.left) {
            instant.transform = 'none'
            instant.animation += '-p'
        }

        instant.zIndex = seed
        options.type && (instant.messageType = options.type)

        instant.msgShow = true                  //将isShow 属性设置为true（用于过渡动画切换）
    })


    return {
        close() {
            setImmediate(() => {
                instant.msgShow = false
                Msg.close(id, options.onClose, options.bottom ? 'up' : 'down')
            })
        },
        closeAll() {
            if (options.bottom) {
                upInstants.forEach((item, index)=>{
                    item.msgShow = false
                })
                upInstants = []
            }else {
                downInstants.forEach((item, index) => {
                    item.msgShow = false
                })
                downInstants = []
            }
        }
    }

}
//  五种不同类型的消息
let types = ['info', 'success', 'warn', 'error', 'common']
types.forEach(type => {
    Msg[type] = (options) => {
        if (typeof options === 'object') {
            return Msg({
                type,
                ...options
            })
        }
        return Msg({
            type,
            msg: options
        })
    }

})
Msg.close = (id, userOnClose, dir) => {
    let removeHeight
    let instants
    let iIndex

    if (dir === 'down') {
        instants = downInstants
    } else if (dir === 'up') {
        instants = upInstants
    }

    try {

        instants.forEach((item, index) => {
            if (id === item.id) {
                // 如果用户设置了回调，就在关闭时执行回调
                if (typeof userOnClose === 'function') {
                    userOnClose(item)
                }
                removeHeight = item.$el.offsetHeight
                iIndex = index
                instants.splice(index, 1) // 移除当前的实例
                throw new Error("close") //终止当前循环
            }
        })

    } catch (e) {
        //TODO handle the exception        
    }
    // 如果只有小于等于一条数据则直接返回
    if (instants.length <= 0) return
    instants.forEach((item, index) => {
        if (!item.cover) {
            if (dir === 'down' && index <= iIndex) {
                item.$el.style.top = parseInt(item.$el.style.top) - removeHeight - 12 + 'px' //给以后的实例设置top
            } else if (dir === 'up' && index >= iIndex) {
                item.$el.style.bottom = parseInt(item.$el.style.bottom) - removeHeight - 12 + 'px' //给以后的实例设置bottom
            }
        }
    })
}

export default Msg
