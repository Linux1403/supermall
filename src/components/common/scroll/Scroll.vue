<template>
	<div ref="wrapper">
		<div>
			<slot></slot>
		</div>		
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:'Scroll',
		props:{
			probeType:{
				type:Number,
				default(){
					return 0
				}
			},
			pullUpLoad:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		components:{
			
		},
		data(){
			return {
				scroll:null,
				message:"hhh"
			}
		},
		mounted(){
			// 创建scroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				pullUpLoad:this.pullUpLoad,
				probeType:this.probeType,
				click:true,
				mouseWheel:true,
				observeDOM:true
			})
			// 监听滚动的位置
			this.scroll.on('scroll',(position)=>{
				// console.log(position)
				this.$emit('scroll',position)
			})
			// 监听上拉加载
			this.scroll.on('pullingUp',()=>{
				this.$emit('pullingUp')
			})
			
			
		},
		methods:{
			backTop(x,y,time=300){
				this.scroll.scrollTo(x,y,time)
			},
			
			finishPullUp(){
				this.scroll.finishPullUp()
			}
			
		}
	}
</script>

<style>
</style>
