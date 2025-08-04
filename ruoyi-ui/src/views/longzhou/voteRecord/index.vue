<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="队伍名称" prop="teamName">
        <el-input
          v-model="queryParams.teamName"
          placeholder="请输入队伍名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="投票日期">
        <el-date-picker clearable
          v-model="daterangeVoteDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
          v-hasPermi="['longzhou:voteRecord:add']"
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
          v-hasPermi="['longzhou:voteRecord:edit']"
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
          v-hasPermi="['longzhou:voteRecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['longzhou:voteRecord:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="voteRecordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="投票记录ID" align="center" prop="voteId" />
      <el-table-column label="用户名" align="center" prop="userName" />
      <el-table-column label="队伍名称" align="center" prop="teamName" />
      <el-table-column label="投票日期" align="center" prop="voteDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voteDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投票时间" align="center" prop="voteTime" width="120">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.voteTime, '{h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['longzhou:voteRecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['longzhou:voteRecord:remove']"
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

    <!-- 添加或修改投票记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="队伍名称" prop="teamName">
          <el-input v-model="form.teamName" placeholder="请输入队伍名称" />
        </el-form-item>
        <el-form-item label="投票日期" prop="voteDate">
          <el-date-picker clearable
            v-model="form.voteDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择投票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="投票时间" prop="voteTime">
          <el-time-picker clearable
            v-model="form.voteTime"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="请选择投票时间">
          </el-time-picker>
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
import { listVoteRecord, getVoteRecord, delVoteRecord, addVoteRecord, updateVoteRecord } from "@/api/longzhou/voteRecord"

export default {
  name: "VoteRecord",
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
      // 投票记录-每日每用户每队伍限投1次表格数据
      voteRecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 队伍ID时间范围
      daterangeVoteDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: null,
        teamName: null,
        voteDate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        teamName: [
          { required: true, message: "队伍名称不能为空", trigger: "blur" }
        ],
        voteDate: [
          { required: true, message: "投票日期不能为空", trigger: "blur" }
        ],
        voteTime: [
          { required: true, message: "投票时间不能为空", trigger: "blur" }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询投票记录-每日每用户每队伍限投1次列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeVoteDate && '' != this.daterangeVoteDate) {
        this.queryParams.params["beginVoteDate"] = this.daterangeVoteDate[0]
        this.queryParams.params["endVoteDate"] = this.daterangeVoteDate[1]
      }
      listVoteRecord(this.queryParams).then(response => {
        this.voteRecordList = response.rows
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
        voteId: null,
        userName: null,
        teamName: null,
        voteDate: null,
        voteTime: null
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
      this.daterangeVoteDate = []
      this.resetForm("queryForm")
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.voteId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加投票记录-每日每用户每队伍限投1次"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const voteId = row.voteId || this.ids
      getVoteRecord(voteId).then(response => {
        this.form = response.data
        this.open = true
        this.title = "修改投票记录-每日每用户每队伍限投1次"
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.voteId != null) {
            updateVoteRecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功")
              this.open = false
              this.getList()
            })
          } else {
            addVoteRecord(this.form).then(response => {
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
      const voteIds = row.voteId || this.ids
      this.$modal.confirm('是否确认删除投票记录-每日每用户每队伍限投1次编号为"' + voteIds + '"的数据项？').then(function() {
        return delVoteRecord(voteIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess("删除成功")
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('longzhou/voteRecord/export', {
        ...this.queryParams
      }, `voteRecord_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
