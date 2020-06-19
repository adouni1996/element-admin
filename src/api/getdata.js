import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 
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
}

/**
 * 获取管理员列表
 */
export const getUserList = (token,query='',pagenum=1,pagesize=10) => {
	return new Promise( (resolve, reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.get(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
		.then(res => {
			resolve(res)
		})
		.catch(error => {
			reject(error)
		})
	})
}