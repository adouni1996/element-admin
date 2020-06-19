<template>
	<el-card class='box-card'>
		<!-- 面包屑 -->
		<el-breadcrumb separator="/">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 搜索框 -->
		<el-row>
			<el-col>
				<div style="margin-top: 15px;width: 800px;">
				  <el-input placeholder="请输入内容" v-model="query" class="input-with-select inputSearch">
				    <el-button slot="append" icon="el-icon-search"></el-button>
				  </el-input>
					<el-button type='success'> 添加用户</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table
      :data="userlist"
			stripe=true
      style="width: 100%">
      <el-table-column
        prop="date"
        label="#"
				type='index'
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
			<el-table-column
			  prop="mobile"
			  label="电话">
			</el-table-column>
			
			<!-- temlate内部要用数据，设置slot-scope属性，属性值为数据源 -->
			
			<el-table-column
			  label="创建时间">
				<template slot-scope='scope'>
					{{ scope.row.create_time | fmdata}}
				</template>
			</el-table-column>
			
			
			<el-table-column
			  prop="mg_state"
			  label="用户状态">
				<template slot-scope='scope'>
					<el-switch
					  v-model="scope.row.mg_state"
					  active-color="#13ce66"
					  inactive-color="#ff4949">
					</el-switch>
				</template>
				
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="操作"
				width="200">
				<template>
					<el-button type="primary" plain icon="el-icon-edit" circle></el-button>
					<el-button type="danger"  plain icon="el-icon-delete" circle></el-button>
					<el-button type="success" plain icon="el-icon-check" circle></el-button>
				</template>
			</el-table-column>
    </el-table>
	</el-card>
</template>

<script>
	
	import { getUserList } from '@/api/getdata'
	export default {
		data(){
			return{
				res: '',
				token: '',
				query: '',
				pagenum: 1,
				pagesize: 10,
				total: '',
				userlist: []
			}
		},
		methods:{
			getToken () {
				this.token = localStorage.getItem('token')
			},
			async getUserLi(token){			
				const data = await getUserList(this.token)
				const {
					meta: {
						status,msg
					}, 
					data: {
						users,total
					},
				} = data.data 
				if ( status === 200 ){	
					this.userlist =users
					this.total = total
					this.$message.success(msg)
				} else {
					this.$message.warning(msg)
				}
				
			}
		},
		created() {
			this.getToken()
			this.getUserLi(this.token)
		}
	}
</script>

<style>
	.inputSearch{
		width: 350px;
		padding-right: 15px;
	}
</style> 
