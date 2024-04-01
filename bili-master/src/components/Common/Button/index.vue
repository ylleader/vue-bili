<template>
    <button :disabled="disabled" :class="btnClass" :style="btnStyle" @click="btnClick" ref="bbtn">
        <i class="iconfont icon-loading ico" v-if="loading"></i>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'blue'
        },
        size: {
            type: [Number, String],
            default: 15
        },
        activeColor: '',
        color: '',
        backgroundColor: '',
        activeBackgroundColor: '',
        borderColor: '',
        activeBorderColor: '',
        padding: '',
        width: '',
        height: '',
        border: '',
        borderRadius: '',
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    computed: {
        btnClass() {
            let c = ['b-button', this.type]
            if (this.disabled) {
                c.push('disabled')
            }
            return c
        },
        btnStyle() {
            return {
                padding: this.padding,
                width: this.width,
                height: this.height,
                border: this.border,
                borderRadius: this.borderRadius,
                '--fs': parseInt(this.size) + 'px',
                '--color': this.color,
                '--bg-color': this.backgroundColor,
                '--br-color': this.borderColor,
                '--a-color': this.activeColor,
                '--a-bg-color': this.activeBackgroundColor,
                '--a-br-color': this.activeBorderColor
            }
        }
    },
    methods: {
        btnClick() {
            this.$emit('click')
        }
    }

}
</script>

<style lang="scss" scoped>
button {
    padding: 0;
    // background-color: white;
    outline: none;
    font-family: 'PingFang SC', Helvetica, sans-serif, Arial;
}

.disabled {
    background-color: var(--bg-color) !important;
    color: var(--color) !important;
    border-color: var(--br-color) !important;
    cursor: not-allowed !important;
    opacity: .6 !important;
}

.ico {
    display: inline-block;
    margin-right: 4px;
    animation: btn-loading 2s linear infinite;
}

@keyframes btn-loading {
    from {
        transform: rotateZ(0);
    }

    to {
        transform: rotateZ(360deg);
    }
}

.b-button {
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 6px 18px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-clip: padding-box;

    --fs: 15px;
    --color: white;
    --bg-color: #00a1d6;
    --br-color: #00a1d6;
    --a-color: white;
    --a-bg-color: #33b4de;
    --a-br-color: #33b4de;

    font-size: var(--fs);
    color: var(--color);
    background-color: var(--bg-color);
    border-color: var(--br-color);

    &:hover {
        color: var(--a-color);
        background-color: var(--a-bg-color);
        border-color: var(--a-br-color);

        i {
            color: var(--a-color);
        }
    }

    i {
        color: var(--color);
        font-size: var(--fs);
        // margin-right: 4px;
    }
}

.blue {
    --color: white;
    --bg-color: #00a1d6;
    --a-color: white;
    --a-bg-color: #33b4de;
}

.white {
    --color: #18191c;
    --bg-color: #fff;
    --br-color: #e7e7e7;
    --a-color: #00a1d6;
    --a-bg-color: #fff;
    --a-br-color: #00a1d6;
}

.pink {
    --color: white;
    --bg-color: #f25d8e;
    --a-color: white;
    --a-bg-color: #ff709f;
    --br-color: #f25d8e;
    --a-br-color: #ff709f;
}

.t-black {
    --color: #fff;
    --bg-color: rgba(0, 0, 0, .5);
    --a-color: #fff;
    --a-bg-color: rgba(0, 0, 0, .7);
    --br-color: rgba(255, 255, 255, .6);
    --a-br-color: rgba(255, 255, 255, 1);
}

.l-gray {
    --color: #61666D;
    --bg-color: #f6f6f8;
    --a-color: #00a1d6;
    --a-bg-color: #e3e5e7;
    --br-color: #f6f6f8;
    --a-br-color: #e3e5e7;
}
</style>