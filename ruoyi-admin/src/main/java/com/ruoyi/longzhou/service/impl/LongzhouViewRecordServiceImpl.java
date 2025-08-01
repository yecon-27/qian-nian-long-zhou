package com.ruoyi.longzhou.service.impl;

import java.util.List;
import com.ruoyi.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.longzhou.mapper.LongzhouViewRecordMapper;
import com.ruoyi.longzhou.domain.LongzhouViewRecord;
import com.ruoyi.longzhou.service.ILongzhouViewRecordService;

/**
 * 浏览记录Service业务层处理
 * 
 * @author Cong
 * @date 2025-07-25
 */
@Service
public class LongzhouViewRecordServiceImpl implements ILongzhouViewRecordService 
{
    @Autowired
    private LongzhouViewRecordMapper longzhouViewRecordMapper;

    /**
     * 查询浏览记录
     * 
     * @param viewId 浏览记录主键
     * @return 浏览记录
     */
    @Override
    public LongzhouViewRecord selectLongzhouViewRecordByViewId(Long viewId)
    {
        return longzhouViewRecordMapper.selectLongzhouViewRecordByViewId(viewId);
    }

    /**
     * 查询浏览记录列表
     * 
     * @param longzhouViewRecord 浏览记录
     * @return 浏览记录
     */
    @Override
    public List<LongzhouViewRecord> selectLongzhouViewRecordList(LongzhouViewRecord longzhouViewRecord)
    {
        return longzhouViewRecordMapper.selectLongzhouViewRecordList(longzhouViewRecord);
    }

    /**
     * 新增浏览记录
     * 
     * @param longzhouViewRecord 浏览记录
     * @return 结果
     */
    @Override
    public int insertLongzhouViewRecord(LongzhouViewRecord longzhouViewRecord)
    {
        longzhouViewRecord.setCreateTime(DateUtils.getNowDate());
        return longzhouViewRecordMapper.insertLongzhouViewRecord(longzhouViewRecord);
    }

    /**
     * 修改浏览记录
     * 
     * @param longzhouViewRecord 浏览记录
     * @return 结果
     */
    @Override
    public int updateLongzhouViewRecord(LongzhouViewRecord longzhouViewRecord)
    {
        return longzhouViewRecordMapper.updateLongzhouViewRecord(longzhouViewRecord);
    }

    /**
     * 批量删除浏览记录
     * 
     * @param viewIds 需要删除的浏览记录主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouViewRecordByViewIds(Long[] viewIds)
    {
        return longzhouViewRecordMapper.deleteLongzhouViewRecordByViewIds(viewIds);
    }

    /**
     * 删除浏览记录信息
     * 
     * @param viewId 浏览记录主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouViewRecordByViewId(Long viewId)
    {
        return longzhouViewRecordMapper.deleteLongzhouViewRecordByViewId(viewId);
    }
}
