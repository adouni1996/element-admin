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
	import { login } from '@/api/getdata'
	export default {
		data(){
			return {
				formdata: {
					username: '',
					password: ''
				},
				res: ''
			}
		},
		methods: {
			async handleLonin() {				
				const data = await login(this.formdata)				
				this.res = data.data
				if (this.res.meta.status === 200) {
					this.$message.success('登录成功')
					localStorage.setItem('token',this.res.data.token)
					this.$router.push({ name: 'home' })
				}
				else if (this.res.meta.status ===400) {
					this.$message.error(this.res.meta.msg)
				}
			}
		}
	}
</script>

<style>
	@import url("../../assets/css/login.css");;
</style>
