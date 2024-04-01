<template>
    <Dialog :visible.sync="confirmShow" :width="width" :beforeClose="beforeClose" :showClose="showClose"
        :maskCloseDialog="maskCloseDialog" :position="position" :mask="mask" :lockScroll="lock" @close="close" :title="title">
        <div class="confirm">
            <!-- <div class="c-title" v-if="title || showClose">
                {{ title }}
            </div> -->
            <div class="c-main">
                {{ text }}
            </div>
            <div class="c-foot">
                <div class="btn cancel-btn" @click="cancel">
                    {{ cancelButtonText }}
                </div>
                <div class="btn confirm-btn" @click="confirm">
                    {{ confirmButtonText }}
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script>
import Dialog from '@/components/Common/Dialog'
export default {
    name: 'Confirm',
    components: {
        Dialog
    },
    data() {
        return {
            text: '',
            title: '',
            confirmShow: false,
            width: '420px',
            height: '',
            close: true,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            showClose: true,
            maskCloseDialog: true,
            mask: true,
            position: 'fixed',
            lock: true,
            maskCloseDialog: true,
            beforeClose: undefined
        }
    },
    watch: {
        confirmShow(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.$destroy()
                })
            }
        }
    },
    methods: {
        cancel() {
            this.confirmShow = false
        },
        confirm() {
            this.confirmShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
.confirm {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 15px 15px 15px;
    display: flex;
    flex-direction: column;

    // align-items: center;
    .c-title {
        height: 25px;
        font-size: 18px;
    }

    .c-main {
        box-sizing: border-box;
        margin-bottom: 10px;
        font-size: 15px;
        word-break: break-all;
    }

    .c-foot {
        display: flex;
        justify-content: flex-end;
        font-size: 12px;

        .btn {
            padding: 6px 20px;
            box-sizing: border-box;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            transition: .15s;
            cursor: pointer;
        }

        .cancel-btn {
            border: 1px solid #e7e7e7;
            margin-right: 15px;

            &:hover {
                color: #00a1d6;
                border-color: #00a1d6;
            }
        }

        .confirm-btn {
            background-color: #00a1d6;
            color: white;
            margin-right: 15px;

            &:hover {
                background-color: #33b4de;
            }
        }
    }
}
</style>