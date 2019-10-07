import CountWheel from './wheel/count-wheel'

// 导出
export default CountWheel

// global 情况下，自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('count-wheel', CountWheel)
}
