<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="资源名称" prop="resourceName">
        <el-input
          v-model="queryParams.resourceName"
          placeholder="请输入资源名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资源键值" prop="resourceKey">
        <el-input
          v-model="queryParams.resourceKey"
          placeholder="请输入资源键值"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="后端文件路径" prop="filePath">
        <el-input
          v-model="queryParams.filePath"
          placeholder="请输入后端文件路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="访问URL路径" prop="fileUrl">
        <el-input
          v-model="queryParams.fileUrl"
          placeholder="请输入访问URL路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['longzhou:imageResources:add']"
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
          v-hasPermi="['longzhou:imageResources:edit']"
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
          v-hasPermi="['longzhou:imageResources:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['longzhou:imageResources:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="imageResourcesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="资源ID" align="center" prop="resourceId" />
      <el-table-column label="资源名称" align="center" prop="resourceName" />
      <el-table-column label="资源键值" align="center" prop="resourceKey" />
      <el-table-column label="文件名" align="center" prop="fileName" />
      <el-table-column label="后端文件路径" align="center" prop="filePath" />
      <el-table-column label="访问URL路径" align="center" prop="fileUrl" />
      <el-table-column label="文件大小" align="center" prop="fileSize" />
      <el-table-column label="文件类型" align="center" prop="fileType" />
      <el-table-column label="分类" align="center" prop="category" />
      <el-table-column label="描述" align="center" prop="description">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="显示顺序" align="center" prop="sortOrder" />
      <el-table-column label="创建者" align="center" prop="createBy" />
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
            v-hasPermi="['longzhou:imageResources:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['longzhou:imageResources:remove']"
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

    <!-- 添加或修改龙舟活动图片资源对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="资源名称" prop="resourceName">
          <el-input v-model="form.resourceName" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="资源键值" prop="resourceKey">
          <el-input v-model="form.resourceKey" placeholder="请输入资源键值" />
        </el-form-item>
        <el-form-item label="文件名" prop="fileName">
          <file-upload v-model="form.fileName"/>
        </el-form-item>
        <el-form-item label="后端文件路径" prop="filePath">
          <el-input v-model="form.filePath" placeholder="请输入后端文件路径" />
        </el-form-item>
        <el-form-item label="访问URL路径" prop="fileUrl">
          <el-input v-model="form.fileUrl" placeholder="请输入访问URL路径" />
        </el-form-item>
        <el-form-item label="文件大小" prop="fileSize">
          <el-input v-model="form.fileSize" placeholder="请输入文件大小" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="sortOrder">
          <el-input v-model="form.sortOrder" placeholder="请输入显示顺序" />
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
import { listImageResources, getImageResources, delImageResources, addImageResources, updateImageResources } from "@/api/longzhou/imageResources"

export default {
  name: "ImageResources",
  dicts: ['sys_normal_disable'],
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
      // 龙舟活动图片资源表格数据
      imageResourcesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        resourceName: null,
        resourceKey: null,
        fileName: null,
        filePath: null,
        fileUrl: null,
        fileType: null,
        category: null,
        description: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        resourceId: [
          { required: true, message: "资源ID不能为空", trigger: "blur" }
        ],
        resourceName: [
          { required: true, message: "资源名称不能为空", trigger: "blur" }
        ],
        resourceKey: [
          { required: true, message: "资源键值不能为空", trigger: "blur" }
        ],
        fileName: [
          { required: true, message: "文件名不能为空", trigger: "blur" }
        ],
        filePath: [
          { required: true, message: "后端文件路径不能为空", trigger: "blur" }
        ],
        fileUrl: [
          { required: true, message: "访问URL路径不能为空", trigger: "blur" }
        ],
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询龙舟活动图片资源列表 */
    getList() {
      this.loading = true
      listImageResources(this.queryParams).then(response => {
        this.imageResourcesList = response.rows
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
        resourceId: null,
        resourceName: null,
        resourceKey: null,
        fileName: null,
        filePath: null,
        fileUrl: null,
        fileSize: null,
        fileType: null,
        category: null,
        description: null,
        status: null,
        sortOrder: null,
        createBy: null,
        createTime: null,
        updateBy: null,
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
      this.resetForm("queryForm")
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.resourceId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = "添加龙舟活动图片资源"
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const resourceId = row.resourceId || this.ids
      getImageResources(resourceId).then(response => {
        this.form = response.data
        this.open = true
        this.title = "修改龙舟活动图片资源"
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.resourceId != null) {
            updateImageResources(this.form).then(response => {
              this.$modal.msgSuccess("修改成功")
              this.open = false
              this.getList()
            })
          } else {
            addImageResources(this.form).then(response => {
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
      const resourceIds = row.resourceId || this.ids
      this.$modal.confirm('是否确认删除龙舟活动图片资源编号为"' + resourceIds + '"的数据项？').then(function() {
        return delImageResources(resourceIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess("删除成功")
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('longzhou/imageResources/export', {
        ...this.queryParams
      }, `imageResources_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
