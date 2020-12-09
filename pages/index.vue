<template>
	<div class="container">
		<div class="container-wrap" :style="`bottom:${TABBAR_HEIGHT}px`">
			<nuxt-child/>
		</div>
		<TabBar 
			:height="TABBAR_HEIGHT" 
			:tabs="TABS" 
			:current="currentTab" 
			@change="handleChange">
		</TabBar>
	</div>
</template>

<script>
import TabBar from '@/components/TabBar'
const TABBAR_HEIGHT = 58
const TABS = [
	{id: 0, name: '比赛', icon: 'icon-saishi', path: '/'},
	{id: 1, name: '联赛', icon: 'icon-youhui', path: '/focus'},
	{id: 2, name: '战队', icon: 'icon-tichong', path: '/data'},
	{id: 3, name: '我的', icon: 'icon-zhudan', path: '/mine'}
]
export default {
	components: {
		TabBar
	},
	data() {
		return {
			TABBAR_HEIGHT,
			TABS,
			currentTab: TABS[0]
		}
	},
	created() {
		this.currentTab = TABS.find(tab => tab.path === this.$route.path)
	},
	methods: {
		handleChange(item) {
			this.currentTab = item
			this.$router.push(item.path)
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	&-wrap {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
}
</style>
