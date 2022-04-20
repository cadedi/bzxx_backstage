<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item>
        <el-input
          v-model="tempSearchObj.standardName"
          placeholder="标准名称"
        ></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >查询</el-button
      >
      <el-button type="default" @click="resetSearch">清空</el-button>
    </el-form>

    <div style="margin-bottom: 20px">
      <!-- 添加按钮 -->
      <el-button type="primary" @click="showAddInfo">添 加</el-button>
    </div>

    <el-table border stripe v-loading="listLoading" :data="stdInfos">
      <el-table-column
        prop="enterpriseName"
        label="企业名称"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column label="标准编号" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.standardNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标准名称" width="150" align="center">
        <template slot-scope="scope">
          <span class="name">{{ scope.row.standardName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.status == '现行'">
            <span>现行</span>
          </template>
          <template v-else-if="scope.row.status == '即将实施'">
            <span>即将实施</span>
          </template>
          <template v-else-if="scope.row.status == '被代替'">
            <span>被代替</span>
          </template>
          <template v-else-if="scope.row.status == '废止'">
            <span>废止</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="221" align="center">
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
            :title="`确定删除 ${row.standardName} 吗?`"
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
      @current-change="getInfos"
    >
    </el-pagination>
    <el-dialog
      :title="std.id ? '修改信息' : '添加信息'"
      :visible.sync="dialogStdVisible"
    >
      <el-form ref="stdForm" :model="std" label-width="120px">
        <el-form-item label="企业名称">
          <el-input v-model="std.enterpriseName" />
        </el-form-item>
        <el-form-item label="标准号">
          <el-input v-model="std.standardNo" />
        </el-form-item>
        <el-form-item label="标准名称">
          <el-input v-model="std.standardName" />
        </el-form-item>
        <el-form-item label="登记证号">
          <el-input v-model="std.certNo" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            type="date"
            placeholder="选择时间"
            v-model="std.releaseDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="实施时间">
          <el-date-picker
            type="date"
            placeholder="选择时间"
            v-model="std.applyDate"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="状态">
          <el-select placeholder="选择标准状态" v-model="std.status">
            <el-option label="现行" value="现行"></el-option>
            <el-option label="即将实施" value="即将实施"></el-option>
            <el-option label="被代替" value="被代替"></el-option>
            <el-option label="废止" value="废止"></el-option>
          </el-select>
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
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "EnterpriseStd",

  data() {
    return {
      listLoading: false, // 是否显示列表加载的提示
      searchObj: {
        standardName: "",
      },
      tempSearchObj: {
        standardName: "",
      },
      stdInfos: [], //当前页的数据列表
      page: 1,
      limit: 15, // 每页数量
      total: 0, // 总数量
      std: {}, //当前要操作的数据
      dialogStdVisible: false, // 是否显示添加或修改数据的对话框
      loading: false, // 是否正在提交请求中
    };
  },

  mounted() {},

  created() {
    this.getInfos();
  },

  methods: {
    //获取数据
    async getInfos(page = 1) {
      this.page = page;
      const { limit, searchObj } = this;
      this.listLoading = true;
      const data = {
        targetStandardName: searchObj.standardName,
        targetPage: page,
      };
      const result = await this.$API.enterpriseStd.reqGetEnterpriseStd(data);
      this.listLoading = false;
      this.stdInfos = result.extend.data;
      this.total = result.extend.totalRecordsNum;
    },
    search() {
      this.searchObj = { ...this.tempSearchObj };
      this.getInfos();
    },
    resetSearch() {
      this.searchObj = {
        standardName: "",
      };
      this.tempSearchObj = {
        standardName: "",
      };
      this.getInfos();
    },
    showAddInfo() {
      this.std = {};
      this.dialogStdVisible = true;
    },
    async removeInfo(id) {
      await this.$API.enterpriseStd.reqRemoveEnterpriseStd({ targetId: id });
      this.$message.success("删除成功");
      this.getInfos(this.stdInfos.length === 1 ? this.page - 1 : this.page);
    },
    showUpdateInfo(std) {
      this.std = cloneDeep(std)
      this.dialogStdVisible = true
    },
    cancel() {
      this.dialogStdVisible = false
      this.std = {}
    },
    addOrUpdate() {
      const { std } = this;
      this.loading = true;
      if(std.id){
        // 修改
          this.$API.enterpriseStd.reqUpdateEnterpriseStd(std).then((result) => {
          this.loading = false;
          this.$message.success("保存成功!");
          this.getInfos(std.id ? this.page : 1);
          this.std = {};
          this.dialogStdVisible = false;
        })
      }else{
        // 新增
        this.$API.enterpriseStd.reqAddEnterpriseStd(std).then((result) => {
          this.loading = false;
          this.$message.success("保存成功!");
          this.getInfos(std.id ? this.page : 1);
          this.std = {};
          this.dialogStdVisible = false;
        })
      }
    },
  },
};
</script>

<style scoped>
</style>