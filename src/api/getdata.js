import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 
/**
 * 登录
 */

export const login = data => {
	return new Promise((resolve, reject) => {
		axios.post('login',data)
		.then( res => {resolve(res)})
		.catch(error => {reject(error)})
	})
}

/**
 * 获取管理员列表
 */
export const getUserList = (token,query='',pagenum=1,pagesize=5) => {
	
	return new Promise( (resolve, reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.get(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
		.then(res => {resolve(res)})
		.catch(error => {reject(error)})
	})
}

/**
 * 添加用户
 */

export const addUse = (token,form) => {
	return new Promise( (resolve,reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.post(`users`,form)
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	})
}

/**
 * 删除用户
 */

export const delUse = (token,id) => {
	return new Promise ( (resolve, reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.delete(`users/${id}`)
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	})
}

/**
 * 编辑用户
 */

export const setUse = (token,id,form) => {
	return new Promise ( (resolve, reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.put(`users/${id}`,form)
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	})
}

/**
 * 修改用户状态
 */

export const changeUse = (token,id,mg_state) => {
	return new Promise ( (resolve, reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.put(`users/${id}/state/${mg_state}`)
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	})
}

/**
 * 获取当前用户身份
 */

export const getUserType = (token,id) => {
	return new Promise( (resolve,reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.get(`users/${id}`)
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	}) 
}

/**
 * 获取所有得角色
 */
export const getUserTypeList = (token) => {
	return new Promise ( (resolve,reject) => {
		axios.get(`roles`)
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	}) 
}

/**
 * 修改用户角色
 */

export const setUserType = (token,id,rid) => {
	return new Promise ( (resolve,reject) => {
		axios.defaults.headers.common['Authorization'] = token
		axios.put(`users/${id}/role`,{
			rid:rid
		})
		.then(res=> {resolve(res)})
		.catch(error => {reject(error)})
	})
}