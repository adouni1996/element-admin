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
				<div style="margin-top: 15px;">
				  <el-input placeholder="请输入内容" v-model="query" class="input-with-select inputSearch">
				    <el-button slot="append" icon="el-icon-search"></el-button>
				  </el-input>
					<el-button type='success'> 添加用户</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table
      :data="tableData"
			stripe=true
      style="width: 100%">
      <el-table-column
        prop="date"
        label="#"
				type='index'
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="邮箱">
      </el-table-column>
			<el-table-column
			  prop="address"
			  label="电话">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="创建时间">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="用户状态">
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="操作">
			</el-table-column>
    </el-table>
	</el-card>
</template>

<script>
	
	import { getUserList } from '@/api/getdata'
	export default {
		data(){
			return{
				query: 'aa',
				tableData:[{
           date: '2016-05-02',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1518 弄'
        }, {
           date: '2016-05-04',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1517 弄'
        }, {
           date: '2016-05-01',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1519 弄'
        }, {
           date: '2016-05-03',
           name: '王小虎',
           address: '上海市普陀区金沙江路 1516 弄'
        }],
				res: '',
				token: '',
				query: '',
				pagenum: 1,
				pagesize: 10
			}
		},
		methods:{
			getToken () {
				this.token = localStorage.getItem('token')
			},
			async getUserLi(token){
				// this.$http.defaults.headers.common['Authorization'] = this.token
				
				// this.res =await this.$http.get(
				// 	`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
				// )
				
				
				
				
				const data = await getUserList(this.token)
				this.res = data.data 
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
