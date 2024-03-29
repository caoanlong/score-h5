import Vue from 'vue';
import Vant, { Lazyload } from 'vant';

// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css';

Vue.use(Vant)

Vue.use(Lazyload, {
    lazyComponent: true,
})