package com.ruoyi.longzhou.service.impl;

import java.util.List;
import com.ruoyi.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.longzhou.mapper.LongzhouVoteRecordMapper;
import com.ruoyi.longzhou.domain.LongzhouVoteRecord;
import com.ruoyi.longzhou.service.ILongzhouVoteRecordService;

/**
 * 投票记录-每日每用户每队伍限投1次Service业务层处理
 * 
 * @author Cong
 * @date 2025-07-25
 */
@Service
public class LongzhouVoteRecordServiceImpl implements ILongzhouVoteRecordService 
{
    @Autowired
    private LongzhouVoteRecordMapper longzhouVoteRecordMapper;

    /**
     * 查询投票记录-每日每用户每队伍限投1次
     * 
     * @param voteId 投票记录-每日每用户每队伍限投1次主键
     * @return 投票记录-每日每用户每队伍限投1次
     */
    @Override
    public LongzhouVoteRecord selectLongzhouVoteRecordByVoteId(Long voteId)
    {
        return longzhouVoteRecordMapper.selectLongzhouVoteRecordByVoteId(voteId);
    }

    /**
     * 查询投票记录-每日每用户每队伍限投1次列表
     * 
     * @param longzhouVoteRecord 投票记录-每日每用户每队伍限投1次
     * @return 投票记录-每日每用户每队伍限投1次
     */
    @Override
    public List<LongzhouVoteRecord> selectLongzhouVoteRecordList(LongzhouVoteRecord longzhouVoteRecord)
    {
        return longzhouVoteRecordMapper.selectLongzhouVoteRecordList(longzhouVoteRecord);
    }

    /**
     * 新增投票记录-每日每用户每队伍限投1次
     * 
     * @param longzhouVoteRecord 投票记录-每日每用户每队伍限投1次
     * @return 结果
     */
    @Override
    public int insertLongzhouVoteRecord(LongzhouVoteRecord longzhouVoteRecord)
    {
        longzhouVoteRecord.setCreateTime(DateUtils.getNowDate());
        return longzhouVoteRecordMapper.insertLongzhouVoteRecord(longzhouVoteRecord);
    }

    /**
     * 修改投票记录-每日每用户每队伍限投1次
     * 
     * @param longzhouVoteRecord 投票记录-每日每用户每队伍限投1次
     * @return 结果
     */
    @Override
    public int updateLongzhouVoteRecord(LongzhouVoteRecord longzhouVoteRecord)
    {
        longzhouVoteRecord.setUpdateTime(DateUtils.getNowDate());
        return longzhouVoteRecordMapper.updateLongzhouVoteRecord(longzhouVoteRecord);
    }

    /**
     * 批量删除投票记录-每日每用户每队伍限投1次
     * 
     * @param voteIds 需要删除的投票记录-每日每用户每队伍限投1次主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouVoteRecordByVoteIds(Long[] voteIds)
    {
        return longzhouVoteRecordMapper.deleteLongzhouVoteRecordByVoteIds(voteIds);
    }

    /**
     * 删除投票记录-每日每用户每队伍限投1次信息
     * 
     * @param voteId 投票记录-每日每用户每队伍限投1次主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouVoteRecordByVoteId(Long voteId)
    {
        return longzhouVoteRecordMapper.deleteLongzhouVoteRecordByVoteId(voteId);
    }
}
