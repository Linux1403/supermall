import axios from 'axios'

export function request1(config){
	const instance = axios.create({
		baseURL:"https://api-hmugo-web.itheima.net/api/public/v1",,
		timeout:5000
	})
	
	instance.interceptors.request.use(config=>{
		return config
	},err =>{
		console.log(err)
	})
	
	instance.interceptors.response.use(res=>{
		return res.data
	},err=>{
		console.log(res)
	})
	
	return instance(config)
	
}