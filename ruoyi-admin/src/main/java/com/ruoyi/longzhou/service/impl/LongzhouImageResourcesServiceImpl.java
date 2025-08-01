package com.ruoyi.longzhou.service.impl;

import java.util.List;
import com.ruoyi.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.longzhou.mapper.LongzhouImageResourcesMapper;
import com.ruoyi.longzhou.domain.LongzhouImageResources;
import com.ruoyi.longzhou.service.ILongzhouImageResourcesService;

/**
 * 龙舟活动图片资源Service业务层处理
 * 
 * @author ruoyi
 * @date 2025-08-01
 */
@Service
public class LongzhouImageResourcesServiceImpl implements ILongzhouImageResourcesService 
{
    @Autowired
    private LongzhouImageResourcesMapper longzhouImageResourcesMapper;

    /**
     * 查询龙舟活动图片资源
     * 
     * @param resourceId 龙舟活动图片资源主键
     * @return 龙舟活动图片资源
     */
    @Override
    public LongzhouImageResources selectLongzhouImageResourcesByResourceId(Long resourceId)
    {
        return longzhouImageResourcesMapper.selectLongzhouImageResourcesByResourceId(resourceId);
    }

    /**
     * 查询龙舟活动图片资源列表
     * 
     * @param longzhouImageResources 龙舟活动图片资源
     * @return 龙舟活动图片资源
     */
    @Override
    public List<LongzhouImageResources> selectLongzhouImageResourcesList(LongzhouImageResources longzhouImageResources)
    {
        return longzhouImageResourcesMapper.selectLongzhouImageResourcesList(longzhouImageResources);
    }

    /**
     * 新增龙舟活动图片资源
     * 
     * @param longzhouImageResources 龙舟活动图片资源
     * @return 结果
     */
    @Override
    public int insertLongzhouImageResources(LongzhouImageResources longzhouImageResources)
    {
        longzhouImageResources.setCreateTime(DateUtils.getNowDate());
        return longzhouImageResourcesMapper.insertLongzhouImageResources(longzhouImageResources);
    }

    /**
     * 修改龙舟活动图片资源
     * 
     * @param longzhouImageResources 龙舟活动图片资源
     * @return 结果
     */
    @Override
    public int updateLongzhouImageResources(LongzhouImageResources longzhouImageResources)
    {
        longzhouImageResources.setUpdateTime(DateUtils.getNowDate());
        return longzhouImageResourcesMapper.updateLongzhouImageResources(longzhouImageResources);
    }

    /**
     * 批量删除龙舟活动图片资源
     * 
     * @param resourceIds 需要删除的龙舟活动图片资源主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouImageResourcesByResourceIds(Long[] resourceIds)
    {
        return longzhouImageResourcesMapper.deleteLongzhouImageResourcesByResourceIds(resourceIds);
    }

    /**
     * 删除龙舟活动图片资源信息
     * 
     * @param resourceId 龙舟活动图片资源主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouImageResourcesByResourceId(Long resourceId)
    {
        return longzhouImageResourcesMapper.deleteLongzhouImageResourcesByResourceId(resourceId);
    }
}
