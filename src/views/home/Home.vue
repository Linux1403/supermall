<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<scroll 
			@scroll="contentScroll" 
			class="content" 
			:pull-up-load="true"
			ref='scroller'
			@pullingUp="loadMore">
			<home-swiper :banners="banners"></home-swiper>
			<home-recommend :recommends="recommends"></home-recommend>
			<feature></feature>

			<tab-control class="tabControl" :titles="['流行','新款','精选']" @tabSwitch="tabSwitch"></tab-control>
			<goods-list :goods="showGood"></goods-list>
		</scroll>
		<back-top @click.native="backTop" :probe-type="3" v-if="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import HomeRecommend from './childComps/HomeRecommendView.vue'
	import Feature from './childComps/FeatureView.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'

	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home.js"

	export default {
		name: 'Home',
		components: {
			NavBar,
			HomeSwiper,
			HomeRecommend,
			Feature,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data() {
			return {
				// result:null
				banners: [],
				recommends: [],
				titles: ['流行', '新款', '精选'],
				currentType: 'pop',
				isShowBackTop:false,
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					}
				}
			}
		},
		// 组件创建完以后 发送网络请求
		created() {
			this.getHomeMultidata()
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		computed: {
			showGood() {
				return this.goods[this.currentType].list
			}
		},
		methods: {
			/**
			 * 事件监听
			 */
			tabSwitch(index) {
				switch (index) {
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				console.log(index)
				console.log(this.currentType)

			},
			contentScroll(position) {
				// console.log(position)
				this.isShowBackTop=Math.abs(position.y)>1000
				// this.isShowBackTop=(-position.y)>1000
				// if(position.y<-1000)
				// {
				// 	this.isShowBackTop=true
				// }
				// else{
				// 	this.isShowBackTop=false
				// }
			},
			loadMore(){
				// console.log("上拉加载")
				this.getHomeGoods(this.currentType)
				
			},
			/**
			 * 网络请求
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					console.log(res)
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					console.log(res)

					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					this.$refs.scroller.finishPullUp()
				})
			},
			backTop() {
				this.$refs.scroller.backTop(0, 0)
			}

		}
	}
</script>

<style scoped>
	#home {
		padding-top: 44px;
		position: relative;
		height: 100vh;
		/* height: 100vh; */
	}

	.home-nav {
		color: #fff;
		background-color: var(--color-tint);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 1;
	}

	.tabControl {
		position: sticky;
		top: 44px;

	}

	.content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		/* height: 300px; */
		/* height: calc(100% - 93px); */
	}
</style>
