package com.ruoyi.longzhou.service;

import java.util.List;
import com.ruoyi.longzhou.domain.LongzhouImageResources;

/**
 * 龙舟活动图片资源Service接口
 * 
 * @author ruoyi
 * @date 2025-08-01
 */
public interface ILongzhouImageResourcesService 
{
    /**
     * 查询龙舟活动图片资源
     * 
     * @param resourceId 龙舟活动图片资源主键
     * @return 龙舟活动图片资源
     */
    public LongzhouImageResources selectLongzhouImageResourcesByResourceId(Long resourceId);

    /**
     * 查询龙舟活动图片资源列表
     * 
     * @param longzhouImageResources 龙舟活动图片资源
     * @return 龙舟活动图片资源集合
     */
    public List<LongzhouImageResources> selectLongzhouImageResourcesList(LongzhouImageResources longzhouImageResources);

    /**
     * 新增龙舟活动图片资源
     * 
     * @param longzhouImageResources 龙舟活动图片资源
     * @return 结果
     */
    public int insertLongzhouImageResources(LongzhouImageResources longzhouImageResources);

    /**
     * 修改龙舟活动图片资源
     * 
     * @param longzhouImageResources 龙舟活动图片资源
     * @return 结果
     */
    public int updateLongzhouImageResources(LongzhouImageResources longzhouImageResources);

    /**
     * 批量删除龙舟活动图片资源
     * 
     * @param resourceIds 需要删除的龙舟活动图片资源主键集合
     * @return 结果
     */
    public int deleteLongzhouImageResourcesByResourceIds(Long[] resourceIds);

    /**
     * 删除龙舟活动图片资源信息
     * 
     * @param resourceId 龙舟活动图片资源主键
     * @return 结果
     */
    public int deleteLongzhouImageResourcesByResourceId(Long resourceId);
}
