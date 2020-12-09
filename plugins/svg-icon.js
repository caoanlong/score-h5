import Vue from 'vue'
import SvgIcon from '@/components//SvgIcon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)

export const req = require.context('@/assets/icons/svg', false, /\.svg$/)
requireAll(req)

export const requireAllName = requireContext => requireContext.keys().map(item => item.split('./')[1].split('.svg')[0])