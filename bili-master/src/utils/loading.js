import Vue from 'vue'
import Loading from '@/components/Common/Loading'

let LoadingConstructor = Vue.extend(Loading)

const Load = (options) => {

    //判断参数类型
    if (typeof options === 'string') {
        options = {
            text: options
        }
    }

    //创建组件实例
    const instant = new LoadingConstructor({
        data: options
    })

    instant.loadingShow = true


    instant.$mount()

    //根据参数container（loading容器），选择loading插入的元素
    if (options.container) {
        instant.position = 'absolute'
        instant.zIndex = 1
        options.container.appendChild(instant.$el)
    } else {
        document.body.appendChild(instant.$el)
    }

    return instant
}

export default Load