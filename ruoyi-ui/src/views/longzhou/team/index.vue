<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="队伍名称" prop="teamName">
        <el-input
          v-model="queryParams.teamName"
          placeholder="请输入队伍名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="队长/负责人" prop="teamLeader">
        <el-input
          v-model="queryParams.teamLeader"
          placeholder="请输入队长/负责人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- 删除所属活动ID搜索栏 -->
      <el-form-item label="总投票数" prop="totalVotes">
        <el-input
          v-model="queryParams.totalVotes"
          placeholder="请输入总投票数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['longzhou:team:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['longzhou:team:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['longzhou:team:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['longzhou:team:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="teamList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- 删除队伍ID列 -->
      <el-table-column label="队伍名称" align="center" prop="teamName" />
      <el-table-column label="队长/负责人" align="center" prop="teamLeader" />
      <!-- 删除所属活动ID列 -->
      <el-table-column label="总投票数" align="center" prop="totalVotes" />
      <el-table-column label="今日投票数" align="center" prop="todayVotes" />
      <el-table-column label="总浏览数" align="center" prop="totalViews" />
      <el-table-column label="今日浏览数" align="center" prop="todayViews" />
      <el-table-column label="当前排名" align="center" prop="ranking" />
      <el-table-column label="显示顺序" align="center" prop="displayOrder" />
      <!-- 删除状态列 -->
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['longzhou:team:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['longzhou:team:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改龙舟队伍信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="队伍名称" prop="teamName">
          <el-input v-model="form.teamName" placeholder="请输入队伍名称" />
        </el-form-item>
        <el-form-item label="队长/负责人" prop="teamLeader">
          <el-input v-model="form.teamLeader" placeholder="请输入队长/负责人" />
        </el-form-item>
        <el-form-item label="队伍描述" prop="teamDescription">
          <el-input v-model="form.teamDescription" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="队伍主图" prop="teamImage">
          <image-upload v-model="form.teamImage"/>
        </el-form-item>
        <!-- 删除所属活动ID字段 -->
        <el-form-item label="显示顺序" prop="displayOrder">
          <el-input v-model="form.displayOrder" placeholder="请输入显示顺序" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTeam, getTeam, delTeam, addTeam, updateTeam } from "@/api/longzhou/team"

export default {
  name: "Team",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 龙舟队伍信息表格数据
      teamList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态(1:正常 2:隐藏 0:删除)时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teamName: null,
        teamLeader: null,
        activityId: null,
        totalVotes: null,
        status: null,
        createTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        teamName: [
          { required: true, message: "队伍名称不能为空", trigger: "blur" }
        ],
        teamLeader: [
          { required: true, message: "队长/负责人不能为空", trigger: "blur" }
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询龙舟队伍信息列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0]
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1]
      }
      listTeam(this.queryParams).then(response => {
        this.teamList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        teamId: null,
        teamName: null,
        teamLeader: null,
        teamDescription: null,
        teamImage: null,
        activityId: null,
        totalVotes: null,
        todayVotes: null,
        totalViews: null,
        todayViews: null,
        ranking: null,
        displayOrder: null,
        status: null,
        createTime: null,
        updateTime: null
      }
      this.resetForm("form")
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = []
      this.resetForm("queryForm")
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.teamId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加龙舟队伍信息"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const teamId = row.teamId || this.ids
      getTeam(teamId).then(response => {
        this.form = response.data
        this.open = true
        this.title = "修改龙舟队伍信息"
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.teamId != null) {
            updateTeam(this.form).then(response => {
              this.$modal.msgSuccess("修改成功")
              this.open = false
              this.getList()
            })
          } else {
            addTeam(this.form).then(response => {
              this.$modal.msgSuccess("新增成功")
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const teamIds = row.teamId || this.ids
      this.$modal.confirm('是否确认删除龙舟队伍信息编号为"' + teamIds + '"的数据项？').then(function() {
        return delTeam(teamIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess("删除成功")
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('longzhou/team/export', {
        ...this.queryParams
      }, `team_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
