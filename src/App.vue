<template>
    <div>
        <h1>CountUp Demo</h1>
        <count-up :start="start"
                  :duration="duration"
                  :decimal="decimal"
                  :prefix="pre"
        ></count-up>
        <h2>Another Demo Count-to</h2>
        <count-to :startVal="start"
                  :duration="duration"
        ></count-to>
        <h2>Count Wheel</h2>
        <count-wheel :startVal="start"
                     :endVal="end"
                     :duration="duration"
                     :decimal="decimal"
                     :prefix="pre"
        ></count-wheel>
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
                start: 10,
                end: 2019,
                duration: 5,
                decimal: 3,
                pre: "demo-"
            }

        }
    }
</script>

<style lang="scss">

</style>
