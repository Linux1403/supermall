// 这个会和其他公共配置进行合并
// 配置别名
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				// '@':'src'内部配置好了的
				'assets':'@/assets',
				'common':'@/common',
				'components':'@/components',
				'network':'@/network',
				'views':'@/views'
			}
		}
	}
}