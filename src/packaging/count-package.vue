<template>
    <span ref="countup"></span>
</template>

<script>
    import {CountUp} from 'countup.js'
    export default {
        name: 'countup-demo',
        data () {
            return {
                countup: null
            }
        },
        props: {
            end: {
                type: Number,
                default: 2019
            },
            start: {
                type: Number,
                default: 0
            },
            decimal: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 2.5
            },
            prefix: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.initCountup()
        },
        methods: {
            initCountup() {
                this.countup = new CountUp(this.$refs.countup, this.end ,{
                    startVal: this.start,
                    duration: this.duration,
                    prefix: this.prefix,
                    decimalPlaces: this.decimal
                })
                this.countup.start()
            }
        }


    }
</script>

<style lang="scss">

</style>
