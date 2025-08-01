package com.ruoyi.longzhou.mapper;

import java.util.List;
import com.ruoyi.longzhou.domain.LongzhouVoteRecord;

/**
 * 投票记录-每日每用户每队伍限投1次Mapper接口
 * 
 * @author Cong
 * @date 2025-07-25
 */
public interface LongzhouVoteRecordMapper 
{
    /**
     * 查询投票记录-每日每用户每队伍限投1次
     * 
     * @param voteId 投票记录-每日每用户每队伍限投1次主键
     * @return 投票记录-每日每用户每队伍限投1次
     */
    public LongzhouVoteRecord selectLongzhouVoteRecordByVoteId(Long voteId);

    /**
     * 查询投票记录-每日每用户每队伍限投1次列表
     * 
     * @param longzhouVoteRecord 投票记录-每日每用户每队伍限投1次
     * @return 投票记录-每日每用户每队伍限投1次集合
     */
    public List<LongzhouVoteRecord> selectLongzhouVoteRecordList(LongzhouVoteRecord longzhouVoteRecord);

    /**
     * 新增投票记录-每日每用户每队伍限投1次
     * 
     * @param longzhouVoteRecord 投票记录-每日每用户每队伍限投1次
     * @return 结果
     */
    public int insertLongzhouVoteRecord(LongzhouVoteRecord longzhouVoteRecord);

    /**
     * 修改投票记录-每日每用户每队伍限投1次
     * 
     * @param longzhouVoteRecord 投票记录-每日每用户每队伍限投1次
     * @return 结果
     */
    public int updateLongzhouVoteRecord(LongzhouVoteRecord longzhouVoteRecord);

    /**
     * 删除投票记录-每日每用户每队伍限投1次
     * 
     * @param voteId 投票记录-每日每用户每队伍限投1次主键
     * @return 结果
     */
    public int deleteLongzhouVoteRecordByVoteId(Long voteId);

    /**
     * 批量删除投票记录-每日每用户每队伍限投1次
     * 
     * @param voteIds 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteLongzhouVoteRecordByVoteIds(Long[] voteIds);
}
