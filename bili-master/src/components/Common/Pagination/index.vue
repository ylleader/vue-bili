<template>
    <div :class="{ 'pagination': true, 'pagination-disabled': disabled, 'pagination-small': small }"
        v-if="!hideOnSinglePage || pCount !== 1">
        <div v-for="(layout, index) in layoutList" :key="index" class="pagination-option">
            <div :class="{ 'p-n': true, 'p': true, disabled: cPage <= 1, background }"
                @click="cPage <= 1 ? void 0 : currentPageChange(cPage - 1)" v-if="layout === 'prev'">
                <i v-if="!prevText" class="iconfont icon-changyongicon-1"></i>
                <span v-if="prevText" v-text="prevText"></span>
            </div>
            <div :class="{ 'p-n': true, 'n': true, disabled: cPage >= pCount, background }"
                @click="cPage >= pCount ? void 0 : currentPageChange(cPage + 1)" v-else-if="layout === 'next'">
                <i v-if="!nextText" class="iconfont icon-changyongicon-"></i>
                <span v-if="nextText" v-text="nextText"></span>
            </div>
            <div class="pager" v-else-if="layout === 'pager'">
                <div :class="{ 'pager-item': true, active: cPage === 1, background }" v-if="pCount > 0"
                    @click="currentPageChange(1)">
                    1
                </div>
                <div v-if="cPage > 4 && pCount > 7" :class="{ 'pager-ellipsis': true, background }"
                    @mouseenter="ellipsisBtnIconLeft = false" @mouseleave="ellipsisBtnIconLeft = true"
                    @click="currentPageChange(cPage - 5)">
                    <i class="iconfont icon-shenglvehao" v-if="ellipsisBtnIconLeft"></i>
                    <i class="iconfont icon-fangxiang-zuo-shuangxian" v-if="!ellipsisBtnIconLeft"></i>
                </div>
                <div :class="{ 'pager-item': true, active: cPage === p, background }" v-for="p in midPager" :key="p"
                    @click="currentPageChange(p)">
                    {{ p }}
                </div>
                <div v-if="cPage <= pCount - 4 && pCount > 7" :class="{ 'pager-ellipsis': true, background }"
                    @mouseenter="ellipsisBtnIconright = false" @mouseleave="ellipsisBtnIconright = true"
                    @click="currentPageChange(cPage + 5)">
                    <i class="iconfont icon-shenglvehao" v-if="ellipsisBtnIconright"></i>
                    <i class="iconfont icon-fangxiang-you-shuangxian" v-if="!ellipsisBtnIconright"></i>
                </div>
                <div :class="{ 'pager-item': true, active: cPage === pCount, background }" v-if="pCount > 1"
                    @click="currentPageChange(pCount)">
                    {{ pCount }}
                </div>
            </div>
            <div class="jumper" v-else-if="layout === 'jumper'">
                前往
                <input v-model.lazy.number="cPage" type="text">
                页
            </div>
            <div class="total" v-else-if="layout === 'total'">
                共 {{ total }} 条
            </div>
            <div class="sizes" v-else-if="layout === 'sizes'">
                <Popover trigger="click" :top="6" @show="selectSuffixActive = true" @hide="selectSuffixActive = false">
                    <div class="select" slot="reference">
                        <input readonly type="text" :value="`${pSize}条/页`">
                        <span class="select-suffix">
                            <i
                                :class="{ 'iconfont': true, 'icon-xiangxia2': true, 'select-suffix-active': selectSuffixActive }"></i>
                        </span>
                    </div>
                    <div class="select-option-box">
                        <div :class="{ 's-o-item': true, 's-o-item-active': pSize === o }" v-for="(o, i) in pageSizes"
                            :key="i" @click="pageSizeChange(o)">
                            {{ o }}条/页
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    </div>
</template>

<script>
import Popover from '@/components/Common/Popover'
export default {
    name: 'Pagination',
    components: { Popover },
    emits: ['size-change', 'current-change'],
    props: {
        total: {
            type: Number,
            default: 0
        },
        'page-size': {
            type: Number,
            default: 10
        },
        'page-count': {
            type: Number
        },
        'prev-text': {
            type: String,
            default: ''
        },
        'next-text': {
            type: String,
            default: ''
        },
        'page-sizes': {
            type: Array,
            default() {
                return [10, 20, 30, 40, 50, 100]
            }
        },
        'hide-on-single-page': {
            type: Boolean,
            default: false
        },
        'current-page': {
            type: Number,
            default: 1
        },
        background: {
            type: Boolean,
            default: false
        },
        layout: {
            type: String,
            default: 'prev, pager, next, total, sizes, jumper'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // currentPage: 1,
            pSize: this.pageSize,
            cPage: this.currentPage,
            selectSuffixActive: false,
            ellipsisBtnIconLeft: 'icon-shenglvehao',
            ellipsisBtnIconright: 'icon-shenglvehao'
        }
    },
    watch: {
        currentPage(val) {
            this.cPage = val
        },
        cPage: {
            // immediate: true,
            handler(val, oval) {

                if (typeof val != 'number' || Number.isNaN(val)) {
                    this.cPage = oval
                    return
                }

                if (val < 1) {
                    this.cPage = 1
                    return
                } else if (val > this.pCount) {
                    this.cPage = this.pCount ? this.pCount : 1
                    return
                }

                this.$emit('update:current-page', val)
                this.$emit('current-change', val)

                if (val > this.pCount - 4) {
                    this.ellipsisBtnIconright = true
                }
                if (val <= 4) {
                    this.ellipsisBtnIconLeft = true
                }
            }
        },
        pageSize(val) {
            this.pSize = val
        },
        pSize(val) {
            this.$emit('update:page-size', val)
            if (this.cPage > this.pCount) {
                this.cPage = this.pCount
            }
        }
    },
    computed: {
        pCount() {
            return this.pageCount ? this.pageCount : Math.ceil(this.total / this.pSize)
        },
        midPager() {
            let count = this.pCount - 2
            let prevArr = []
            let nextArr = []

            if (count <= 0) {
                return []
            } else if (count >= 5) {
                let prev = 2, next = 2  //当前页左右分页数量默认为2
                let cp = this.cPage     //当前页码
                let p = 0, n = 0

                //边界值判断
                if (cp < 1) {
                    cp = 1
                } else if (cp > this.pCount) {
                    cp = this.pCount
                }

                while (prev + next) {

                    //计算当前页左边的页码
                    while (prev) {
                        //从当前页往左组件递减获取左边页码
                        if (cp - (p + 1) >= 2) {
                            prevArr.unshift(cp - (p + 1))
                            p++
                            prev--
                        } else {
                            next += prev    //若页码小于边界值，则将剩余页码数追加给右面的页码
                            prev = 0        //将左边页码数清零
                            break
                        }
                    }

                    while (next) {
                        if (cp + (n + 1) < this.pCount) {
                            nextArr.push(cp + (n + 1))
                            n++
                            next--
                        } else {
                            prev += next
                            next = 0
                            break
                        }
                    }
                }

                let res = []

                if (cp === 1) {
                    res = [...prevArr, ...nextArr, 6]
                } else if (cp === this.pCount) {
                    res = [cp - 5, ...prevArr, ...nextArr]
                } else {
                    res = [...prevArr, cp, ...nextArr]
                }

                return res


                // while (prevArr.length + nextArr.length < 4) {

                //     while (prevArr.length < prev) {
                //         if (cp - (p + 1) >= 2) {
                //             prevArr.unshift(cp - (p + 1))
                //             p++
                //         } else {
                //             next += prev - p
                //             break
                //         }
                //     }

                //     while (nextArr.length < next) {
                //         if (cp + (n + 1) < this.pCount) {
                //             nextArr.push(cp + (n + 1))
                //             n++
                //         } else {
                //             prev += next - n
                //             break
                //         }
                //     }
                // }

                // if (prevArr.length + nextArr.length < 5) {
                //     if (cp === 1) {
                //         return [...prevArr, ...nextArr, 6]
                //     } else if (cp === this.pCount) {
                //         return [cp - 5, ...prevArr, ...nextArr]
                //     } else {
                //         return [...prevArr, cp, ...nextArr]
                //     }
                // }

            } else {
                const arr = [...Array(this.pCount).keys()]
                arr.shift()
                arr.shift()
                return arr
            }
        },
        layoutList() {
            return this.layout.split(',').map((item) => {
                return item.trim()
            })
        }
    },
    methods: {
        pageSizeChange(val) {
            this.pSize = val
            this.$emit('size-change', val)
        },
        currentPageChange(val) {
            this.cPage = val
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.pagination {
    padding: 2px 5px;
    display: flex;
    align-items: center;
    font-size: 13px;
    user-select: none;

    .pagination-option {
        // margin: 0 10px;
        flex-shrink: 0;

        input {
            background-color: transparent;
        }

        &:first-child * {
            margin-left: 0;
        }

        &:last-child * {
            margin-right: 0;
        }
    }

    .p-n {
        line-height: 28px;
        cursor: pointer;
        transition: .2s;
        color: #303133;

        &:hover {
            color: #00AEEC;

            i {
                color: #00AEEC;
            }
        }

        i {
            color: #303133;
            font-size: 15px;
            font-weight: bold;
            transition: .2s;
            vertical-align: bottom;
        }
    }

    .p {
        padding: 0 12px 0 6px;
    }

    .n {
        padding: 0 6px 0 12px;
    }

    .disabled {
        cursor: not-allowed;
        color: #C0C4CC !important;

        i {
            color: #C0C4CC !important;
        }

        &.background {
            border-color: #eee !important;
        }
    }

    .pager {
        display: flex;
        align-items: center;

        .pager-item,
        .pager-ellipsis {
            min-width: 35px;
            box-sizing: border-box;
            font-weight: bold;
            line-height: 28px;
            padding: 0 4px;
            text-align: center;
            cursor: pointer;
            transition: .2s;

            &:hover {
                color: #00AEEC;
            }
        }

        .pager-ellipsis {
            i {
                font-size: 15px;
                vertical-align: bottom;
            }
        }

        .background {
            min-width: 30px;
            line-height: 26px;
            margin: 0 5px;
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 0 4px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .active {
            color: #00a1d6;
        }
    }

    .background {
        min-width: 30px;
        line-height: 26px;
        margin: 0 5px;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 0 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            border-color: #00a1d6;
            color: #00a1d6;
        }
    }

    .background.active {
        background-color: #00a1d6;
        border-color: #00a1d6;
        color: white;

        &:hover {
            color: white;
        }
    }

    .total,
    .jumper,
    .sizes {
        margin: 0 10px;
    }

    .jumper,
    .sizes {

        input {
            display: inline-block;
            width: 46px;
            height: 28px;
            padding: 0 3px;
            box-sizing: border-box;
            border: 1px solid #eee;
            border-radius: 4px;
            outline: none;
            text-align: center;
            font-size: 13px;
            transition: .2s;
        }
    }

    .jumper {
        input {
            &:hover {
                border-color: #C0C4CC;
            }

            &:focus {
                border-color: #00a1d6;
            }
        }
    }

    .sizes {

        .select {
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;

            &:hover {
                input {
                    border-color: #00a1d6;
                }
            }

            input {
                width: 100px;
                padding: 0px 25px 0px 8px;
                box-sizing: border-box;
                border: 1px solid #eee;
                cursor: pointer;
            }

            .select-suffix {
                position: absolute;
                right: 8px;
                line-height: 12px;

                i {
                    display: inline-block;
                    font-size: 12px;
                    transition: .3s;
                    transform: rotate(0);
                }

                .select-suffix-active {
                    transform: rotate(180deg);
                }
            }



        }

        .select-option-box {
            width: 98px;
            border-radius: 6px;
            overflow: hidden;
            font-size: 13px;

            .s-o-item {
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;

                &:hover {
                    background-color: #F1F2F3;
                    color: #00a1d6;
                }
            }

            .s-o-item-active {
                font-weight: bold;
                color: #00a1d6;
            }
        }

    }

}

.select-option-box {
    width: 98px;
    border-radius: 6px;
    overflow: hidden;
    font-size: 13px;

    .s-o-item {
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: #F1F2F3;
            color: #00a1d6;
        }
    }

    .s-o-item-active {
        font-weight: bold;
        color: #00a1d6;
    }
}

.pagination-disabled {
    cursor: not-allowed;

    * {
        pointer-events: none;
        color: #C0C4CC !important;
        border-color: #C0C4CC !important;
    }

    .background {
        background-color: transparent !important;
    }
}

.pagination-small {
    font-size: 12px;

    .p-n {
        line-height: 22px;

        i {
            font-size: 14px;
        }
    }

    .pager {

        .pager-item,
        .pager-ellipsis {
            min-width: 22px;
            line-height: 22px;
            font-size: 12px;
        }

        .pager-ellipsis {
            i {
                font-size: 12px;
            }
        }

        .background {
            min-width: 23px;
            line-height: 20px;
            margin: 0 3px;
            border: 1px solid #eee;
            border-radius: 4px;
            padding: 0 4px;
        }
    }

    .background {
        min-width: 22px;
        line-height: 20px;
        margin: 0 5px;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 0 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            border-color: #00a1d6;
            color: #00a1d6;
        }
    }

    .background.active {
        background-color: #00a1d6;
        border-color: #00a1d6;
        color: white;

        &:hover {
            color: white;
        }
    }

    .jumper,
    .sizes {

        input {
            width: 38px;
            height: 24px;
            font-size: 12px;
        }
    }

    .sizes {

        .select {


            input {
                width: 80px;
                padding: 0px 20px 0px 4px;
            }

            .select-suffix {
                right: 4px;
            }
        }

        .select-option-box {
            width: 78px;
            font-size: 12px;

            .s-o-item {
                height: 30px;
            }
        }

    }
}
</style>