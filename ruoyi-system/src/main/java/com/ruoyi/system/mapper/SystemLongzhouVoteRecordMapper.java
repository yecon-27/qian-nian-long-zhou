package com.ruoyi.system.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.ruoyi.system.domain.SystemLongzhouVoteRecord;

/**
 * 龙舟投票记录Mapper接口 - 系统API
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public interface SystemLongzhouVoteRecordMapper 
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
     * 查询用户投票记录列表（带分页）
     * 
     * @param userId 用户ID
     * @return 龙舟投票记录集合
     */
    public List<SystemLongzhouVoteRecord> selectUserVoteRecords(@Param("userId") Long userId);

    /**
     * 查询用户今日投票次数
     * 
     * @param userId 用户ID
     * @return 今日投票次数
     */
    public Integer selectTodayVoteCount(@Param("userId") Long userId);

    /**
     * 查询用户今日已投票的作品
     * 
     * @param userId 用户ID
     * @return 已投票作品信息
     */
    public List<Map<String, Object>> selectTodayVotedTeams(@Param("userId") Long userId);

    /**
     * 查询用户对指定作品的有效投票记录
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @return 投票记录
     */
    public SystemLongzhouVoteRecord selectUserTeamVote(@Param("userId") Long userId, @Param("teamId") Long teamId);

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
     * 取消投票（更新状态为无效）
     * 
     * @param voteId 投票记录ID
     * @param cancelTime 取消时间
     * @return 结果
     */
    public int cancelVote(@Param("voteId") Long voteId, @Param("cancelTime") java.util.Date cancelTime);

    /**
     * 删除龙舟投票记录
     * 
     * @param voteId 龙舟投票记录主键
     * @return 结果
     */
    public int deleteLongzhouVoteRecordByVoteId(Long voteId);

    /**
     * 批量删除龙舟投票记录
     * 
     * @param voteIds 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteLongzhouVoteRecordByVoteIds(Long[] voteIds);

    /**
     * 调用存储过程执行投票
     * 
     * @param params 参数Map，包含userId、teamId、ipAddress和result(OUT参数)
     * @return 无返回值，结果通过OUT参数获取
     */
    public void executeVote(Map<String, Object> params);
}