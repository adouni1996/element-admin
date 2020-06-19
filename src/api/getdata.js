import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

/**
 * 登录
 */

export const login = data => {
	
	return new Promise((resolve, reject) => {
		axios.post('login',data)
		.then( res => {
			resolve(res)
		})
		.catch(error => {
			reject(error)
		})
	})
	
	
	
	// this.$http.post('login',data).then( res => {
	// 	return res
	// })
}