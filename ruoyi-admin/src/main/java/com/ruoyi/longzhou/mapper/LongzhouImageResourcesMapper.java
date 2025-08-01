package com.ruoyi.longzhou.mapper;

import java.util.List;
import com.ruoyi.longzhou.domain.LongzhouImageResources;

/**
 * 龙舟活动图片资源Mapper接口
 * 
 * @author ruoyi
 * @date 2025-08-01
 */
public interface LongzhouImageResourcesMapper 
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
     * 删除龙舟活动图片资源
     * 
     * @param resourceId 龙舟活动图片资源主键
     * @return 结果
     */
    public int deleteLongzhouImageResourcesByResourceId(Long resourceId);

    /**
     * 批量删除龙舟活动图片资源
     * 
     * @param resourceIds 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteLongzhouImageResourcesByResourceIds(Long[] resourceIds);
}
