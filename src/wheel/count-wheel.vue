<template>
    <span>{{curVal}}</span>
</template>

<script>
    export default {
        name: "count-wheel",
        data() {
            return {
                curVal: 0
            }
        },
        props: {
            startVal: {
                type: Number,
                default: 0
            },
            endVal: {
                type: Number,
                default: 2019
            },
            decimalPlaces: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 2000
            },
            separator: {
                type: String,
                default: ","
            },
            prefix: {
                type: String,
                default: ""
            }
        },
        methods: {
            start() {


            }

        },
        mounted() {
            this.start()
        }
    }
</script>

<style scoped>

</style>
