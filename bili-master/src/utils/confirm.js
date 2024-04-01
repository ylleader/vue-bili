import Vue from 'vue'
import Confirm from '@/components/Common/Dialog/Confirm'

let ConfirmConstructor = Vue.extend(Confirm)


const confirm = (text, title, options = {}) => {

    return new Promise((resolve, reject) => {

        const instant = new ConfirmConstructor({
            data: { text, title, ...options }
        })

        instant.cancel = function () {
            reject('cancel')
            instant.confirmShow = false
        }

        instant.close = function () {
            reject('close')
            instant.confirmShow = false
        }

        instant.confirm = function () {
            resolve('confirm')
            instant.confirmShow = false
        }

        instant.$mount()
        if (options.container) {
            instant.position = 'absolute'
            options.container.appendChild(instant.$el)
        } else {
            document.body.appendChild(instant.$el)
        }

        instant.confirmShow = true
    })

}


export default confirm