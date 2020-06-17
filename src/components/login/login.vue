<template>
	<div class='login-wrap'>
		<el-form
		class='login-form'
		label-position="top"
		label-width="80px"
		:model="formdata">
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formdata.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="formdata.password"></el-input>
			</el-form-item>
			<el-button
			@click.prevent = 'handleLonin()'
			 class='login-btn' type='primary'>登录</el-button>
		</el-form>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				formdata: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			handleLonin() {
				this.$http.post('login',this.formdata)
				.then(res => {
					const { data, meta:{msg, status} } = res.data
					if (status === 200) {
						this.$route.push({name: 'home'})
					} 
					else if (status === 400) {
						this.$message.error(msg)
					}
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/login.css");;
</style>
