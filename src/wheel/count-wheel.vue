<template>
    <div>
        <span>{{curVal}}</span>
    </div>
</template>

<script>
    import {requestAnimationFrame, cancelAnimationFrame} from "./requestAnimationFrame";

    export default {
        name: "count-wheel",
        data() {
            return {
                curVal: null,
                error: '',
                pause: false,
                rAF: null,
                startTime: null,
                calculatedVal: null,
                remaining: null,
                localDuration: this.duration,
                localStartVal: this.startVal,
                localEndVal: this.endVal
            }
        },
        computed: {
            validatedStart: {
                get() {
                    return this.validateVal(this.localStartVal)
                },
                set(val) {
                    this.localStartVal = val
                }
            },
            validatedEnd() {
                return this.validateVal(this.localEndVal)
            },
            countDown() {
                return this.validatedStart > this.validatedEnd
            },
            decimalMult() {
                return Math.pow(10, this.decimalplaces)
            }
        },
        props: {
            startVal: {
                type: Number,
                required: false,
                default: 0
            },
            endVal: {
                type: Number,
                required: false,
                default: 2019
            },
            decimalplaces: {
                type: Number,
                required: false,
                default: 0
            },
            duration: {
                type: Number,
                required: false,
                default: 2000
            },
            separator: {
                type: String,
                required: false,
                default: ","
            },
            prefix: {
                type: String,
                required: false,
                default: ""
            },
            autoplay: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        // 根据autoplay设置，在改变startVal或者endVal的时候判断是否播放
        watch: {
            startVal() {
                if (this.autoplay) {
                    this.start()
                }
            },
            endVal() {
                if (this.autoplay) {
                    this.start()
                }
            }
        },
        methods: {
            start() {
                if (this.error) return
                if (this.duration > 0) {
                    this.pause = false
                    // requestAnimationFrame调用callback函数时会传入timestamp
                    // 参数，代表调用的时刻
                    this.rAF = requestAnimationFrame(this.count)
                } else {
                    this.curVal = this.endVal
                }
            },
            pauseResume() {
                if (!this.pause) cancelAnimationFrame(this.rAF)
                else {
                    this.startTime = null
                    this.localDuration = this.remaining
                    this.validatedStart = this.curVal
                    this.rAF = requestAnimationFrame(this.count)
                }
                this.pause = !this.pause
            },
            // 设置为初始状态
            reset() {
                cancelAnimationFrame(this.rAF)
                this.pause = true
                this.localStartVal = this.startVal
                this.curVal = this.localStartVal

                this.startTime = null
                this.localDuration = this.duration
                this.remaining = this.duration
            },
            // 这里的timestamp参数是被自动传入的
            count(timestamp) {
                if (!this.startTime) this.startTime = timestamp
                let progress = timestamp - this.startTime
                this.remaining = this.localDuration - progress
                // 变化速度和经过的时间是呈反比的
                if (this.countDown) {
                    this.calculatedVal = this.validatedStart - ((this.validatedStart - this.validatedEnd) * (progress / this.localDuration))
                } else {
                    this.calculatedVal = this.validatedStart + ((this.validatedEnd - this.validatedStart) * (progress / this.localDuration))
                }
                // 在最后一帧，防止越界
                if (this.countDown) {
                    this.calculatedVal = (this.calculatedVal < this.validatedEnd) ? this.validatedEnd : this.calculatedVal
                } else {
                    this.calculatedVal = (this.calculatedVal > this.validatedEnd) ? this.validatedEnd : this.calculatedVal
                }
                // 考虑小数
                this.calculatedVal = Math.round(this.calculatedVal * this.decimalMult) / this.decimalMult
                // 把计算后的值赋予显示值
                this.curVal = this.calculatedVal
                // 是否继续
                if (progress < this.localDuration) {
                    this.rAF = requestAnimationFrame(this.count)
                } else {
                    this.$emit('callback')
                }
            },

            validateVal(val) {
                let newVal = Number(val);
                if (!typeof newVal === 'number' && !isNaN(newVal)) {
                    this.error = `invalid start or end value: ${val}`
                    return null
                } else {
                    return newVal
                }
            },
            formatting(val) {
                return val

            }
        },
        // 根据autoplay判断是否自动运行
        mounted() {
            if (this.autoplay) this.start()
        },
        // 退出的时候销毁动画
        destroyed() {
            cancelAnimationFrame(this.rAF)
        }
    }
</script>

<style scoped>

</style>
