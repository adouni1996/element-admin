
/**
 * 登录
 */

export const login = data => {
	this.$http.post('login',data).then( res => {
		return res
	})
}