<template>
    <div class="switch-button-box" :style="switchButtonBoxStyle">
        <span class="switch-text pre-text">
            {{ text }}
        </span>
        <div class="button-box">
            <div class="ratio-box">
                <div class="switch-button" @click="switchChange">
                    <div class="btn" :style="buttonStyle">
                    </div>
                </div>
            </div>
        </div>
        <!-- <span class="switch-text back-text">
            123123
        </span> -->
    </div>

</template>

<script>
export default {
    name: 'SwitchButton',
    emits: ['change'],
    props: {
        width: {
            type: String,
            default: '30px'
        },
        activeColor: {
            type: String,
            default: '#00AEEC'
        },
        inactiveColor: {
            type: String,
            default: '#9499A0'
        },
        value: {
            type: Boolean
        },
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            buttonStyle: {
                transform: 'translateX(2px)'
            },
            switchColor: this.inactiveColor
        }
    },
    computed: {
        switchButtonBoxStyle() {
            return {
                '--width': this.width,
                '--switchColor': this.switchColor
            }
        }
    },
    watch: {
        value: {
            handler(val) {
                if (val) {
                    this.buttonStyle = {
                        transform: 'translateX(' + (parseInt(this.width) - parseInt(this.width) / 1.8 - 2) + 'px)'
                    }
                    this.switchColor = this.activeColor
                } else {
                    this.buttonStyle = {
                        transform: 'translateX(2px)'
                    }
                    this.switchColor = this.inactiveColor
                }
            },
            immediate: true
        }
    },
    methods: {
        switchChange() {
            this.$emit('input', !this.value)
            this.$emit('change')
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.switch-button-box {

    --width: '30px';
    --switchColor: ''
        // width: var(--width);
        display: flex;
    align-items: center;


    .button-box {
        width: var(--width);

        .ratio-box {
            width: var(--width);
            height: 0;
            padding-top: 66%;
            position: relative;
        }

        .switch-button {
            width: 100%;
            height: 100%;
            background-color: var(--switchColor);
            position: absolute;
            top: 0;
            left: 0;
            border-radius: calc(var(--width) / 2);
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
            align-items: center;

            .btn {
                width: calc(var(--width) / 1.8);
                height: calc(var(--width) / 1.8);
                border-radius: 50%;
                background-color: white;

                transform: translateX(3px);
                transition: .2s;
            }
        }
    }

    .switch-text {
        color: var(--switchColor);
        font-size: calc(var(--width) / 2.2);
    }

    .pre-text {
        margin-right: 3px;
    }

    .pre-text {
        margin-left: 3px;
    }


}
</style>