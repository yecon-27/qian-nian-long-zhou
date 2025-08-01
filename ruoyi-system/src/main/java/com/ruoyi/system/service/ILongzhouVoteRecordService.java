package com.ruoyi.system.service;

import java.util.List;
import com.ruoyi.system.domain.SystemLongzhouVoteRecord;
import com.ruoyi.system.domain.vo.VoteStatusVO;

/**
 * 龙舟投票记录Service接口
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public interface ILongzhouVoteRecordService 
{
    /**
     * 查询龙舟投票记录
     * 
     * @param voteId 龙舟投票记录主键
     * @return 龙舟投票记录
     */
    public SystemLongzhouVoteRecord selectLongzhouVoteRecordByVoteId(Long voteId);

    /**
     * 查询龙舟投票记录列表
     * 
     * @param longzhouVoteRecord 龙舟投票记录
     * @return 龙舟投票记录集合
     */
    public List<SystemLongzhouVoteRecord> selectLongzhouVoteRecordList(SystemLongzhouVoteRecord longzhouVoteRecord);

    /**
     * 查询用户投票记录列表
     * 
     * @param userId 用户ID
     * @return 龙舟投票记录集合
     */
    public List<SystemLongzhouVoteRecord> selectUserVoteRecords(Long userId);

    /**
     * 查询用户对特定队伍的投票记录
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @return 投票记录
     */
    public SystemLongzhouVoteRecord selectUserTeamVote(Long userId, Long teamId);

    /**
     * 查询用户今日投票次数
     * 
     * @param userId 用户ID
     * @return 投票次数
     */
    public Integer selectTodayVoteCount(Long userId);

    /**
     * 获取用户投票状态
     * 
     * @param userId 用户ID
     * @return 投票状态信息
     */
    public VoteStatusVO getUserVoteStatus(Long userId);

    /**
     * 执行投票
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @param ipAddress IP地址
     * @return 投票结果消息
     */
    public String executeVote(Long userId, Long teamId, String ipAddress);

    /**
     * 取消投票
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @return 结果
     */
    public int cancelVote(Long userId, Long teamId);

    /**
     * 新增龙舟投票记录
     * 
     * @param longzhouVoteRecord 龙舟投票记录
     * @return 结果
     */
    public int insertLongzhouVoteRecord(SystemLongzhouVoteRecord longzhouVoteRecord);

    /**
     * 修改龙舟投票记录
     * 
     * @param longzhouVoteRecord 龙舟投票记录
     * @return 结果
     */
    public int updateLongzhouVoteRecord(SystemLongzhouVoteRecord longzhouVoteRecord);

    /**
     * 批量删除龙舟投票记录
     * 
     * @param voteIds 需要删除的龙舟投票记录主键集合
     * @return 结果
     */
    public int deleteLongzhouVoteRecordByVoteIds(Long[] voteIds);

    /**
     * 删除龙舟投票记录信息
     * 
     * @param voteId 龙舟投票记录主键
     * @return 结果
     */
    public int deleteLongzhouVoteRecordByVoteId(Long voteId);
}