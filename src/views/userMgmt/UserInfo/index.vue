<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item>
        <el-input v-model="tempSearchObj.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >查询</el-button
      >
      <el-button type="default" @click="resetSearch">清空</el-button>
    </el-form>

    <div style="margin-bottom: 20px">
      <!-- 添加按钮 -->
      <el-button type="primary" @click="showAddInfo">添 加</el-button>
      <!-- 批量删除按钮 -->
      <el-button
        type="danger"
        @click="revomveUsers"
        :disabled="selectedIds.length === 0"
        >批量删除
      </el-button>
    </div>

    <el-table border stripe v-loading="listLoading" :data="userInfos" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55" />
      <el-table-column prop="id" label="用户ID" width="150" align="center">
      </el-table-column>
      <el-table-column label="用户名" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="150" align="center">
        <template slot-scope="scope">
          <span class="name">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="150" align="center">
        <template slot-scope="scope">
          <span class="name">{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <a title="修改" style="margin: 10px">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showUpdateInfo(row)"
            ></el-button>
          </a>
          <el-popconfirm
            :title="`确定删除 ${row.name} 吗?`"
            @onConfirm="removeInfo(row.id)"
          >
            <a title="删除" style="margin: 10px" slot="reference">
              <el-button
                type="danger"
                style="margin-left: 10px"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </a>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding: 20px 0"
      background
      layout="prev, pager, next"
      :total="parseInt(total)"
      :page-size="limit"
      :current-page="parseInt(page)"
      @current-change="getUsers"
    >
    </el-pagination>
    <el-dialog
      :title="user.id ? '修改信息' : '添加信息'"
      :visible.sync="dialogUserVisible"
    >
      <el-form ref="userForm" :model="user" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="user.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="user.phone" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="addOrUpdate"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "UserInfo",

  data() {
    return {
      selectedIds: [],//选中的id列表
      checkAll: false, // 是否全选
      listLoading: false, // 是否显示列表加载的提示
      searchObj: {
        name: "",
      },
      tempSearchObj: {
        name: "",
      },
      userInfos: [], //当前页的数据列表
      page: 1,
      limit: 15, // 每页数量
      total: 0, // 总数量
      user: {}, //当前要操作的数据
      dialogUserVisible: false, // 是否显示添加或修改数据的对话框
      loading: false, // 是否正在提交请求中
    };
  },

  mounted() {},

  created() {
    this.getUsers();
  },

  methods: {
    revomveUsers(){
       this.$confirm('确定删除吗?').then(async () => {
        await this.$API.userInfo.reqRemoveUsers(this.selectedIds)
        this.$message.success('删除成功')
        this.getUsers()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    handleSelectionChange(selection){
      this.selectedIds = selection.map(item => item.id)
    },
    //获取数据
    async getUsers(page = 1) {
      this.page = page;
      const { limit, searchObj } = this;
      this.listLoading = true;
      const data = {
        name: searchObj.name,
        targetPage: page,
      };
      const result = await this.$API.userInfo.reqGetUser(data);
      this.listLoading = false;
      this.userInfos = result.extend.data;
      this.total = result.extend.totalRecordsNum;
    },
    search() {
      this.searchObj = { ...this.tempSearchObj };
      this.getUsers();
    },
    resetSearch() {
      this.searchObj = {
        name: "",
      };
      this.tempSearchObj = {
        name: "",
      };
      this.getUsers();
    },
    showAddInfo() {
      this.user = {};
      this.dialogUserVisible = true;
    },
    async removeInfo(id) {
      await this.$API.userInfo.reqRemoveUser({ targetId: id });
      this.$message.success("删除成功");
      this.getUsers(this.userInfos.length === 1 ? this.page - 1 : this.page);
    },
    showUpdateInfo(user) {
      this.user = cloneDeep(user);
      this.dialogUserVisible = true;
    },
    cancel() {
      this.dialogUserVisible = false;
      this.user = {};
    },
    addOrUpdate() {
      const { user } = this;
      this.loading = true;
      if (user.id) {
        // 修改
        this.$API.userInfo.reqUpdateUser(user).then((result) => {
          this.loading = false;
          this.$message.success("保存成功!");
          this.getUsers(user.id ? this.page : 1);
          this.user = {};
          this.dialogUserVisible = false;
        });
      } else {
        // 新增
        this.$API.userInfo.reqAddUser(user).then((result) => {
          this.loading = false;
          this.$message.success("保存成功!");
          this.getUsers(user.id ? this.page : 1);
          this.user = {};
          this.dialogUserVisible = false;
        });
      }
    },
  },
};
</script>

<style scoped>
</style>