<template>
	
	<div>
		<el-container class='container'>
		  <el-header class='header'>
				<el-row>
					<el-col :span="8">
						<div class="grid-content bg-purple">		
								这里放的是图片
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light main">			
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
		    <el-aside width="200px" class='aside'>Aside</el-aside>
		    <el-main class='main'>Main</el-main>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.container {
		height: 100%
	}
	.header {
		background-color: #263445;
		height: 60px;
		line-height: 60px;
	}
	.main{
		text-align: center;
		color: white;
		font-weight: 800;
	}
	.longinout{
		float: right;
		padding-left: 30px;
		
	}
</style>