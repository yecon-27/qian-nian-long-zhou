package com.ruoyi.system.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ruoyi.system.mapper.SystemLongzhouVoteRecordMapper;
import com.ruoyi.system.mapper.SystemLongzhouTeamMapper;
import com.ruoyi.system.domain.SystemLongzhouVoteRecord;
import com.ruoyi.system.domain.vo.VoteStatusVO;
import com.ruoyi.system.service.ILongzhouVoteRecordService;

/**
 * 龙舟投票记录Service业务层处理
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
@Service("systemLongzhouVoteRecordService")
public class LongzhouVoteRecordServiceImpl implements ILongzhouVoteRecordService 
{
    @Autowired
    private SystemLongzhouVoteRecordMapper longzhouVoteRecordMapper;

    @Autowired
    private SystemLongzhouTeamMapper longzhouTeamMapper;

    /** 每日投票限制 */
    private static final int DAILY_VOTE_LIMIT = 3;

    /**
     * 查询龙舟投票记录
     * 
     * @param voteId 龙舟投票记录主键
     * @return 龙舟投票记录
     */
    @Override
    public SystemLongzhouVoteRecord selectLongzhouVoteRecordByVoteId(Long voteId)
    {
        return longzhouVoteRecordMapper.selectLongzhouVoteRecordByVoteId(voteId);
    }

    /**
     * 查询龙舟投票记录列表
     * 
     * @param longzhouVoteRecord 龙舟投票记录
     * @return 龙舟投票记录
     */
    @Override
    public List<SystemLongzhouVoteRecord> selectLongzhouVoteRecordList(SystemLongzhouVoteRecord longzhouVoteRecord)
    {
        return longzhouVoteRecordMapper.selectLongzhouVoteRecordList(longzhouVoteRecord);
    }

    /**
     * 查询用户投票记录列表
     * 
     * @param userId 用户ID
     * @return 龙舟投票记录
     */
    @Override
    public List<SystemLongzhouVoteRecord> selectUserVoteRecords(Long userId)
    {
        return longzhouVoteRecordMapper.selectUserVoteRecords(userId);
    }

    /**
     * 查询用户对特定队伍的投票记录
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @return 投票记录
     */
    @Override
    public SystemLongzhouVoteRecord selectUserTeamVote(Long userId, Long teamId)
    {
        return longzhouVoteRecordMapper.selectUserTeamVote(userId, teamId);
    }

    /**
     * 查询用户今日投票次数
     * 
     * @param userId 用户ID
     * @return 投票次数
     */
    @Override
    public Integer selectTodayVoteCount(Long userId)
    {
        return longzhouVoteRecordMapper.selectTodayVoteCount(userId);
    }

    /**
     * 获取用户投票状态
     * 
     * @param userId 用户ID
     * @return 投票状态信息
     */
    @Override
    public VoteStatusVO getUserVoteStatus(Long userId)
    {
        // 查询今日投票次数
        Integer todayVoteCount = longzhouVoteRecordMapper.selectTodayVoteCount(userId);
        if (todayVoteCount == null) {
            todayVoteCount = 0;
        }

        // 查询今日已投票的作品
        List<Map<String, Object>> votedTeams = longzhouVoteRecordMapper.selectTodayVotedTeams(userId);
        
        List<Long> votedTeamIds = votedTeams.stream()
                .map(team -> (Long) team.get("team_id"))
                .collect(Collectors.toList());
        
        List<String> votedTeamNames = votedTeams.stream()
                .map(team -> (String) team.get("team_name"))
                .collect(Collectors.toList());

        return new VoteStatusVO(todayVoteCount, DAILY_VOTE_LIMIT, votedTeamIds, votedTeamNames);
    }

    /**
     * 执行投票
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @param ipAddress IP地址
     * @return 投票结果消息
     */
    @Override
    @Transactional
    public String executeVote(Long userId, Long teamId, String ipAddress)
    {
        try {
            // 1. 检查用户今日投票次数
            Integer todayVoteCount = longzhouVoteRecordMapper.selectTodayVoteCount(userId);
            if (todayVoteCount == null) {
                todayVoteCount = 0;
            }
            
            if (todayVoteCount >= DAILY_VOTE_LIMIT) {
                return "今日投票次数已达上限";
            }
            
            // 2. 检查是否已经为该作品投过票
            SystemLongzhouVoteRecord existingVote = longzhouVoteRecordMapper.selectUserTeamVote(userId, teamId);
            if (existingVote != null) {
                return "您已经为该作品投过票了";
            }
            
            // 3. 执行投票 - 插入投票记录
            Map<String, Object> params = new java.util.HashMap<>();
            params.put("userId", userId);
            params.put("teamId", teamId);
            params.put("ipAddress", ipAddress);
            
            longzhouVoteRecordMapper.executeVote(params);
            
            // 4. 更新队伍票数
            longzhouTeamMapper.increaseVoteCount(teamId);
            
            return "投票成功";
            
        } catch (org.springframework.dao.DuplicateKeyException e) {
            // 处理唯一约束冲突
            return "您今日已经为该作品投过票了";
        } catch (Exception e) {
            e.printStackTrace();
            // 确保返回非null的错误消息
            String errorMsg = e.getMessage();
            if (errorMsg == null || errorMsg.trim().isEmpty()) {
                return "投票失败，请稍后重试";
            }
            return "投票失败：" + errorMsg;
        }
    }

    /**
     * 取消投票
     * 
     * @param userId 用户ID
     * @param teamId 队伍ID
     * @return 结果
     */
    @Override
    @Transactional
    public int cancelVote(Long userId, Long teamId)
    {
        // 查找用户对该作品的有效投票记录
        SystemLongzhouVoteRecord voteRecord = longzhouVoteRecordMapper.selectUserTeamVote(userId, teamId);
        if (voteRecord == null) {
            return 0; // 没有找到有效的投票记录
        }

        // 更新投票记录状态为无效
        int result = longzhouVoteRecordMapper.cancelVote(voteRecord.getVoteId(), new Date());
        
        if (result > 0) {
            // 同步更新作品票数（减1）
            longzhouTeamMapper.decreaseVoteCount(teamId);
        }
        
        return result;
    }

    /**
     * 新增龙舟投票记录
     * 
     * @param longzhouVoteRecord 龙舟投票记录
     * @return 结果
     */
    @Override
    public int insertLongzhouVoteRecord(SystemLongzhouVoteRecord longzhouVoteRecord)
    {
        return longzhouVoteRecordMapper.insertLongzhouVoteRecord(longzhouVoteRecord);
    }

    /**
     * 修改龙舟投票记录
     * 
     * @param longzhouVoteRecord 龙舟投票记录
     * @return 结果
     */
    @Override
    public int updateLongzhouVoteRecord(SystemLongzhouVoteRecord longzhouVoteRecord)
    {
        return longzhouVoteRecordMapper.updateLongzhouVoteRecord(longzhouVoteRecord);
    }

    /**
     * 批量删除龙舟投票记录
     * 
     * @param voteIds 需要删除的龙舟投票记录主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouVoteRecordByVoteIds(Long[] voteIds)
    {
        return longzhouVoteRecordMapper.deleteLongzhouVoteRecordByVoteIds(voteIds);
    }

    /**
     * 删除龙舟投票记录信息
     * 
     * @param voteId 龙舟投票记录主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouVoteRecordByVoteId(Long voteId)
    {
        return longzhouVoteRecordMapper.deleteLongzhouVoteRecordByVoteId(voteId);
    }
}