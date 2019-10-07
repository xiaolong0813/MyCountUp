<template>
    <div>
        <h1>CountUp Demo</h1>
        <count-up :start="startNum"
                  :duration="duration"
                  :decimal="decimal"
                  :prefix="pre"
        ></count-up>
        <h2>Another Demo Count-to</h2>
        <count-to :startVal="startNum"
                  :duration="duration"
        ></count-to>
        <h2>Count Wheel</h2>
        <count-wheel :startVal="startNum"
                     ref="wheel"
                     :endVal="end"
                     :duration="4000"
                     :decimalplaces="decimal"
                     :prefix="pre"
        ></count-wheel>
        <button @click="handlePause">pause/resume</button>
        <button @click="handleReset">reset</button>
        <input type="text" v-model="start">
    </div>
</template>

<script>
    import CountUp from "./packaging/count-package";
    import CountTo from "vue-count-to"
    import CountWheel from "./wheel/count-wheel"
    export default {
        name: 'app',
        components: {
            CountUp,
            CountTo,
            CountWheel
        },
        data () {
            return {
                start: 10000,
                end: 2019,
                duration: 5,
                decimal: 3,
                pre: "demo-"
            }
        },
        computed: {
            startNum() {
                return Number(this.start)
            }
        },
        methods: {
            handlePause() {
                this.$refs.wheel.pauseResume()
            },
            handleReset() {
                this.$refs.wheel.reset()
            }
        }
    }
</script>

<style lang="scss">

</style>
