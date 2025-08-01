<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="队伍ID" prop="teamId">
        <el-input
          v-model="queryParams.teamId"
          placeholder="请输入队伍ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID(关联sys_user.user_id，游客为NULL)" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID(关联sys_user.user_id，游客为NULL)"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户IP" prop="userIp">
        <el-input
          v-model="queryParams.userIp"
          placeholder="请输入用户IP"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="浏览日期" prop="viewDate">
        <el-date-picker clearable
          v-model="queryParams.viewDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择浏览日期">
        </el-date-picker>
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
          v-hasPermi="['longzhou:viewRecord:add']"
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
          v-hasPermi="['longzhou:viewRecord:edit']"
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
          v-hasPermi="['longzhou:viewRecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['longzhou:viewRecord:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="viewRecordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="浏览记录ID" align="center" prop="viewId" />
      <el-table-column label="队伍ID" align="center" prop="teamId" />
      <el-table-column label="用户ID(关联sys_user.user_id，游客为NULL)" align="center" prop="userId" />
      <el-table-column label="用户IP" align="center" prop="userIp" />
      <el-table-column label="浏览日期" align="center" prop="viewDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.viewDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览时间" align="center" prop="viewTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.viewTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览时长(秒)" align="center" prop="viewDuration" />
      <el-table-column label="页面类型(list:列表页 detail:详情页)" align="center" prop="pageType" />
      <el-table-column label="设备类型(mobile/desktop/tablet)" align="center" prop="deviceType" />
      <el-table-column label="浏览器类型" align="center" prop="browserType" />
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
            v-hasPermi="['longzhou:viewRecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['longzhou:viewRecord:remove']"
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

    <!-- 添加或修改浏览记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listViewRecord, getViewRecord, delViewRecord, addViewRecord, updateViewRecord } from "@/api/longzhou/viewRecord"

export default {
  name: "ViewRecord",
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
      // 浏览记录表格数据
      viewRecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teamId: null,
        userId: null,
        userIp: null,
        viewDate: null,
        pageType: null,
        deviceType: null,
        browserType: null,
        createTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        teamId: [
          { required: true, message: "队伍ID不能为空", trigger: "blur" }
        ],
        viewDate: [
          { required: true, message: "浏览日期不能为空", trigger: "blur" }
        ],
        viewTime: [
          { required: true, message: "浏览时间不能为空", trigger: "blur" }
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询浏览记录列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0]
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1]
      }
      listViewRecord(this.queryParams).then(response => {
        this.viewRecordList = response.rows
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
        viewId: null,
        teamId: null,
        userId: null,
        userIp: null,
        viewDate: null,
        viewTime: null,
        viewDuration: null,
        pageType: null,
        referrer: null,
        userAgent: null,
        deviceType: null,
        browserType: null,
        sessionId: null,
        createTime: null
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
      this.ids = selection.map(item => item.viewId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加浏览记录"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const viewId = row.viewId || this.ids
      getViewRecord(viewId).then(response => {
        this.form = response.data
        this.open = true
        this.title = "修改浏览记录"
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.viewId != null) {
            updateViewRecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功")
              this.open = false
              this.getList()
            })
          } else {
            addViewRecord(this.form).then(response => {
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
      const viewIds = row.viewId || this.ids
      this.$modal.confirm('是否确认删除浏览记录编号为"' + viewIds + '"的数据项？').then(function() {
        return delViewRecord(viewIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess("删除成功")
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('longzhou/viewRecord/export', {
        ...this.queryParams
      }, `viewRecord_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
