<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a :href="item.link">
				<img :src="item.image">
				<div>{{item.title}}</div>
			</a>
		</div>

	</div>
</template>

<script>
	export default {
		name: "HomeRecommend",
		props: {
			recommends: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style>
	.recommend {
		display: flex;
		width: 100%;
		text-align: center;
		font-size: 12px;
		padding:10px 0 20px;
	}

	.recommend-item {
		flex: 1;
	}

	.recommend img {
		width: 85%;
		margin-bottom: 10px;
	}
</style>
