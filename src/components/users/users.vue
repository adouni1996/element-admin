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
				  <el-input 
					clearable placeholder="请输入内容" 
					v-model="query" 
					class="input-with-select inputSearch"
					@clear='getUserLi()'>
				    <el-button slot="append" icon="el-icon-search"
						@click = 'searchUser()'>
						</el-button>
				  </el-input>
					<el-button type='success' @click= 'showAdduserdia()'> 添加用户</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table
      :data="userlist"
			stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="#"
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
						@change='changeMgstate(scope.row)'
					  active-color="#13ce66"
					  inactive-color="#ff4949">
					</el-switch>
				</template>
				
			</el-table-column>
			<el-table-column
			  prop="address"
			  label="操作"
				width="200">
				<template slot-scope='scope'>
					<el-button 
					type="primary" plain 
					icon="el-icon-edit" 
					circle
					@click = 'showsetuserdia(scope.row)'></el-button>
					<el-button 
					type="danger"  plain
					@click= 'showDeleUser(scope.row.id)'
					icon="el-icon-delete" circle></el-button>
					<el-button 
					type="success" plain 
					icon="el-icon-check" circle
					@click = 'showsetusertypedia(scope.row)'></el-button>
				</template>
			</el-table-column>
    </el-table>
		<div class='page clearfix'>
			<el-pagination
				class='right'
				@size-change="handleSizeChange" 
				@current-change="handleCurrentChange"
				:page-sizes="[5,10]"
				:page-size="5"
				layout="total, sizes, prev, pager, next, jumper"
				:total='total'>
			</el-pagination>
		</div>
		<!-- 对话框 -->
		
		<el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
		  <el-form :model="form" style="padding-right: 50px;">
		    <el-form-item label="用户名" label-width="100px">
		      <el-input v-model="form.username" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" label-width="100px">
		      <el-input v-model="form.password" autocomplete="off"></el-input>
		    </el-form-item>
				<el-form-item label="邮箱" label-width="100px">
				  <el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="100px">
				  <el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
		    <el-button type="primary" @click="addUser">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleset">
		  <el-form :model="form" style="padding-right: 50px;">
		    <el-form-item label="用户名" label-width="100px">
		      <el-input disabled  v-model="form.username" autocomplete="off"></el-input>
		    </el-form-item>
				<el-form-item label="邮箱" label-width="100px">
				  <el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="100px">
				  <el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleset = false">取 消</el-button>
		    <el-button type="primary" @click="setUser()">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="分配角色" :visible.sync="dialogFormVisibleUser">
		  <el-form :model="form" style="padding-right: 50px;">
		    <el-form-item label="用户名" label-width="100px">
		      <el-input disabled  v-model="form.username" autocomplete="off"></el-input>
		    </el-form-item>
				<el-form-item label="角色" label-width="100px" >
					<el-select v-model="currRoleId" placeholder="请选择角色">
						<el-option 
						v-for="(item,i) in roles" :key='i'
						:label="item.roleName" 
						:value="item.id"></el-option>
					</el-select>
				</el-form-item>
				
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleUser = false">取 消</el-button>
		    <el-button type="primary" @click="setUserTypemsg()">确 定</el-button>
		  </div>
		</el-dialog>
		
	</el-card>
</template>

<script>
	
	import {	
		getUserList,
		addUse,
		delUse,
		setUse,
		changeUse,
		getUserType,
		getUserTypeList,
		setUserType
	} from '@/api/getdata'
	export default {
		data(){
			return{
				res: '',
				token: '',
				query: '',
				pagenum: 1,
				pagesize: 5,
				total: 0,
				userlist: [],
				//对话框熟悉
				dialogFormVisibleadd:false,
				//编辑用户信息对话框
				dialogFormVisibleset:false,
				//用户身份对话框
				dialogFormVisibleUser:false,
				//表单数据
				form: {
					username:'',
					password: '',
					email: '',
					mobile: ''				
				},
				roles:'',
				currRoleId: ''
			}
		},
		methods:{
			//编辑用户身份
			async showsetusertypedia(user){
				//获取用户数据
				this.form.id = user.id
				this.form.username = user.username
				this.dialogFormVisibleUser = true
				const data = await getUserType(this.token, user.id)
				const typeList = await getUserTypeList(this.token)
				this.roles = typeList.data.data
				this.currRoleId = data.data.data.rid
			},
			//确认用户身份
			async setUserTypemsg(){
				const data = await setUserType(this.token,this.form.id,this.currRoleId)
				const {
					meta: {
						status,msg
					}
				} = data.data 
				if( status === 200 ){
					this.$message({
						message:msg,
						type:'success',
						duration:1000
					})				
					this.dialogFormVisibleUser = false
				} 
				else {
					this.$message({
						message:msg,
						type:'warning',
						duration:1000
					})
				}	
			},
			
			//修改状态
			async changeMgstate(user){
				const data = await changeUse(this.token,user.id,user.mg_state)
				const {
					meta: {
						status,msg
					}
				} = data.data 
				if( status === 200 ){
					this.$message({
						message:msg,
						type:'success',
						duration:1000
					})				
					this.getUserLi(this.token,'',this.pagenum,this.pagesize)
				} 
				else {
					this.$message({
						message:msg,
						type:'warning',
						duration:1000
					})
				}	
			},
			//删除用户
			showDeleUser(id){
			 this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
					const res = await delUse(this.token,id)
					if( res.data.meta.status === 200 ){
						this.getUserLi(this.token,'',this.pagenum,this.pagesize)
						this.$message({
						  type: 'success',
						  message: res.data.meta.msg,
							duration:1000
						});
					}
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
						duration:1000
          });          
        });	
			},
			
			//添加用户对话框
			showAdduserdia(){			
				this.dialogFormVisibleadd = true
			},
			//添加用户
			async addUser(){
				const res = await addUse(this.token,this.form)
				const { 
					meta: {
						status,msg
					}
				} = res.data 	
				if( status === 201 ){	
					this.$message({
						message:msg,
						type:'success',
						duration:1000
					})					
					this.getUserLi(this.token,'',this.pagenum,this.pagesize)
					this.form = {
						username:'',
						password: '',
						email: '',
						mobile: ''
					}
					this.dialogFormVisibleadd = false
				} 
				else {
					this.$message({
						message:msg,
						type:'warning',
						duration:1000
					})
				}	
			},
			//显示编辑用户信息对话框
			showsetuserdia(user){
				//获取用户数据
				this.form.id = user.id
				this.form.username = user.username
				this.form.email = user.email
				this.form.mobile = user.mobile
				this.dialogFormVisibleset = true
			},
			//编辑用户
			async setUser(){
				const data = await setUse(this.token,this.form.id,this.form)
				const {
					meta:{
						msg,status
					}
				} = data.data
				console.log(data.data)
				if ( status === 200 ){
					this.getUserLi(this.token,'',this.pagenum,this.pagesize)	
					this.dialogFormVisibleset = false
					this.$message({
						message:msg,
						type:'success',
						duration:1000
					})
				} else {
					this.$message({
						message:msg,
						type:'warning',
						duration:1000
					})
				}
			},
			//获取token
			getToken () {
				this.token = localStorage.getItem('token')
			},
			//获取用户列表
			async getUserLi(token=this.token,query='',pagenum=1,pagesize=5){			
				const data = await getUserList(this.token,query,pagenum,pagesize)
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
					this.$message({
						message:msg,
						type:'success',
						duration:1000
					})
				} else {
					this.$message({
						message:msg,
						type:'warning',
						duration:1000
					})
				}
			},
			//分页相关方法
			handleSizeChange (val) {
				this.pagesize = val 
				this.pagenum = 1
				this.getUserLi(this.token,'',1,val)
			},
			handleCurrentChange(val){
				this.pagenum = val 
				this.getUserLi(this.token,'',val,this.pagesize)
			},
			//搜索用户
			searchUser(){
				this.getUserLi(this.token,this.query,this.pagenum,this.pagesize)
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
/* 		padding-right: 15px; */
	}
	.page{
		margin-top: 15px;
	}
	.page .right{
		float: right;
		padding-right: 10px;
	}
	.clearfix:after,.clearfix:before{
        content: "";
        display: table;
   }
  .clearfix:after{
		clear: both;
  }
  .clearfix{
    *zoom: 1;
  }

</style> 
