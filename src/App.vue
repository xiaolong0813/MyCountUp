<template>
    <div>
        <h1>CountUp Demo</h1>
        <count-up :start="this.start"
                  :duration="this.duration"
                  :decimal="this.decimal"
                  :prefix="this.pre"
        ></count-up>
    </div>
</template>

<script>
    import CountUp from "./CountUp";
    export default {
        name: 'app',
        components: {
            CountUp
        },
        data () {
            return {
                start: 10,
                duration: 5,
                decimal: 3,
                pre: "demo-"
            }

        }
    }
</script>

<style lang="scss">

</style>
