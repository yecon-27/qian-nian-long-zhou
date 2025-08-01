package com.ruoyi.longzhou.mapper;

import java.util.List;
import com.ruoyi.longzhou.domain.LongzhouViewRecord;

/**
 * 浏览记录Mapper接口
 * 
 * @author Cong
 * @date 2025-07-25
 */
public interface LongzhouViewRecordMapper 
{
    /**
     * 查询浏览记录
     * 
     * @param viewId 浏览记录主键
     * @return 浏览记录
     */
    public LongzhouViewRecord selectLongzhouViewRecordByViewId(Long viewId);

    /**
     * 查询浏览记录列表
     * 
     * @param longzhouViewRecord 浏览记录
     * @return 浏览记录集合
     */
    public List<LongzhouViewRecord> selectLongzhouViewRecordList(LongzhouViewRecord longzhouViewRecord);

    /**
     * 新增浏览记录
     * 
     * @param longzhouViewRecord 浏览记录
     * @return 结果
     */
    public int insertLongzhouViewRecord(LongzhouViewRecord longzhouViewRecord);

    /**
     * 修改浏览记录
     * 
     * @param longzhouViewRecord 浏览记录
     * @return 结果
     */
    public int updateLongzhouViewRecord(LongzhouViewRecord longzhouViewRecord);

    /**
     * 删除浏览记录
     * 
     * @param viewId 浏览记录主键
     * @return 结果
     */
    public int deleteLongzhouViewRecordByViewId(Long viewId);

    /**
     * 批量删除浏览记录
     * 
     * @param viewIds 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteLongzhouViewRecordByViewIds(Long[] viewIds);
}
