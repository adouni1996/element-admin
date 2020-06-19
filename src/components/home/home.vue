<template>
	
	<div class='body'>
		<el-container class='container'>
		  <el-header class='header' >
				<el-row>
					<el-col :span="8">
						<div class="grid-content bg-purple">		
								这里放的是图片
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light center">			
							电商后台管理系统
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple">				
							<a href='' class='longinout'>退出</a>
						</div>
					</el-col>
				</el-row>
			</el-header>
		  <el-container>
		    <el-aside width="200px" class='aside'>
					<el-menu
					      default-active="2"
					      class="el-menu-vertical-demo"
					      @open="handleOpen"
					      @close="handleClose"
					      background-color="#545c64"
					      text-color="#fff"
					      active-text-color="#ffd04b"
								unique-opened = true>				
								<el-submenu index="1">
								  <template slot="title">
								    <i class="el-icon-user"></i>
								    <span>用户管理</span>
								  </template>				
								    <el-menu-item index="1-1">
											<i class="el-icon-notebook-1"></i>
											<span>用户列表</span>
										</el-menu-item>			 
								</el-submenu>
								<el-submenu index="2">
								  <template slot="title">
								    <i class="el-icon-setting"></i>
								    <span>权限管理</span>
								  </template>				
								    <el-menu-item index="2-1">
											<i class="el-icon-bank-card"></i>
											<span>角色列表</span>
										</el-menu-item>		
										<el-menu-item index="2-2">
											<i class="el-icon-set-up"></i>
											<span>权限列表</span>
										</el-menu-item>		
								</el-submenu>
								<el-submenu index="3">
								  <template slot="title">
								    <i class="el-icon-goods"></i>
								    <span>商品管理</span>
								  </template>				
								    <el-menu-item index="3-1">
											<i class="el-icon-notebook-1"></i>
											<span>商品列表</span>
										</el-menu-item>
										<el-menu-item index="3-1">
											<i class="el-icon-office-building"></i>
											<span>分类参数</span>
										</el-menu-item>
										<el-menu-item index="3-1">
											<i class="el-icon-reading"></i>
											<span>商品分类</span>
										</el-menu-item>			 						 
								</el-submenu>
								<el-submenu index="4">
								  <template slot="title">
								    <i class="el-icon-s-order"></i>
								    <span>订单管理</span>
								  </template>				
								    <el-menu-item index="4-1">
											<i class="el-icon-notebook-2"></i>
											<span>订单列表</span>
										</el-menu-item>			 
								</el-submenu>
								<el-submenu index="5">
								  <template slot="title">
								    <i class="el-icon-s-data"></i>
								    <span>数据统计</span>
								  </template>				
								    <el-menu-item index="5-1">
											<i class="el-icon-location"></i>
											<span>数据列表</span>
										</el-menu-item>			 
								</el-submenu>
					    </el-menu>
					  </el-col>
					</el-row>
				</el-aside>
		    <el-main class='main'>Main</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		beforeCreate() {
			const token = localStorage.setItem('token')
			
			if (!token) {
				this.$router.push({ name: 'login' })
			}
		}
	}
</script>

<style>
	.body{
		height: 100%;
	}
	.container {
		height: 100%
	}
	.header {
		background-color:white;
		height: 60px;
		line-height: 60px;
		
	}
	.center{
		text-align: center;
		font-weight: 800;
	}
	.longinout{
		float: right;
		padding-left: 30px;
		
	}
	.el-menu-vertical-demo{
		height: 100%;
	}
	.main{
		background-color: #FAFAFA;
	}
	
</style>