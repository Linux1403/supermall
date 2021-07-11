<template>
	<div class="tab-bar-item" @click="itemClick">
		<!-- <img src="../../assets/img/tabbar/car.png" />
		<div>
			首页
		</div> -->
		<!-- 插槽 -->
		<div v-if="!isActive">
			<slot name="item-icon"></slot>
		</div>
		<div v-else>
			<slot name="item-icon-active"></slot>
		</div>
		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		props: {
			path: String,
			activeColor:{
				type:String,
				default:'hotpink'
			}
		},
		data() {
			return {
				// isActive: false
			}
		},
		// 计算属性 制药在模板里面代码太复杂 属性可以抽取到这
		computed:{
			isActive(){
				// 判断router里面的path是否和this.path是否相等
				// indexOf如果等于-1没找到 
				return this.$route.path.indexOf(this.path) !==-1
			},
			activeStyle(){
				return this.isActive?{color:this.activeColor}:{}
				
			}
		},
		methods: {
			itemClick() {
				console.log("点击tabBarItem")
				// 不返回用replace
				// 返回用push
				this.$router.replace(this.path)
			}
		}
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}

	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		margin-bottom: 2px;
		vertical-align: middle;
	}


</style>
