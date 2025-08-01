package com.ruoyi.longzhou.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 龙舟活动图片资源对象 longzhou_image_resources
 * 
 * @author ruoyi
 * @date 2025-08-01
 */
public class LongzhouImageResources extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 资源ID */
    private Long resourceId;

    /** 资源名称 */
    @Excel(name = "资源名称")
    private String resourceName;

    /** 资源键值（用于前端调用） */
    @Excel(name = "资源键值", readConverterExp = "用=于前端调用")
    private String resourceKey;

    /** 文件名 */
    @Excel(name = "文件名")
    private String fileName;

    /** 后端文件路径 */
    @Excel(name = "后端文件路径")
    private String filePath;

    /** 访问URL路径 */
    @Excel(name = "访问URL路径")
    private String fileUrl;

    /** 文件大小（字节） */
    @Excel(name = "文件大小", readConverterExp = "字=节")
    private Long fileSize;

    /** 文件类型（png/jpg/svg等） */
    @Excel(name = "文件类型", readConverterExp = "p=ng/jpg/svg等")
    private String fileType;

    /** 分类（首页/投票/排行榜/规则/详情） */
    @Excel(name = "分类", readConverterExp = "首=页/投票/排行榜/规则/详情")
    private String category;

    /** 描述 */
    @Excel(name = "描述")
    private String description;

    /** 状态（0正常 1停用） */
    @Excel(name = "状态", readConverterExp = "0=正常,1=停用")
    private String status;

    /** 显示顺序 */
    @Excel(name = "显示顺序")
    private Long sortOrder;

    public void setResourceId(Long resourceId) 
    {
        this.resourceId = resourceId;
    }

    public Long getResourceId() 
    {
        return resourceId;
    }

    public void setResourceName(String resourceName) 
    {
        this.resourceName = resourceName;
    }

    public String getResourceName() 
    {
        return resourceName;
    }

    public void setResourceKey(String resourceKey) 
    {
        this.resourceKey = resourceKey;
    }

    public String getResourceKey() 
    {
        return resourceKey;
    }

    public void setFileName(String fileName) 
    {
        this.fileName = fileName;
    }

    public String getFileName() 
    {
        return fileName;
    }

    public void setFilePath(String filePath) 
    {
        this.filePath = filePath;
    }

    public String getFilePath() 
    {
        return filePath;
    }

    public void setFileUrl(String fileUrl) 
    {
        this.fileUrl = fileUrl;
    }

    public String getFileUrl() 
    {
        return fileUrl;
    }

    public void setFileSize(Long fileSize) 
    {
        this.fileSize = fileSize;
    }

    public Long getFileSize() 
    {
        return fileSize;
    }

    public void setFileType(String fileType) 
    {
        this.fileType = fileType;
    }

    public String getFileType() 
    {
        return fileType;
    }

    public void setCategory(String category) 
    {
        this.category = category;
    }

    public String getCategory() 
    {
        return category;
    }

    public void setDescription(String description) 
    {
        this.description = description;
    }

    public String getDescription() 
    {
        return description;
    }

    public void setStatus(String status) 
    {
        this.status = status;
    }

    public String getStatus() 
    {
        return status;
    }

    public void setSortOrder(Long sortOrder) 
    {
        this.sortOrder = sortOrder;
    }

    public Long getSortOrder() 
    {
        return sortOrder;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("resourceId", getResourceId())
            .append("resourceName", getResourceName())
            .append("resourceKey", getResourceKey())
            .append("fileName", getFileName())
            .append("filePath", getFilePath())
            .append("fileUrl", getFileUrl())
            .append("fileSize", getFileSize())
            .append("fileType", getFileType())
            .append("category", getCategory())
            .append("description", getDescription())
            .append("status", getStatus())
            .append("sortOrder", getSortOrder())
            .append("createBy", getCreateBy())
            .append("createTime", getCreateTime())
            .append("updateBy", getUpdateBy())
            .append("updateTime", getUpdateTime())
            .toString();
    }
}
