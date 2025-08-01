package com.ruoyi.system.domain.vo;

import java.util.List;

/**
 * 用户投票状态VO
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public class VoteStatusVO
{
    /** 今日投票次数 */
    private Integer todayVoteCount;

    /** 剩余投票次数 */
    private Integer remainingVotes;

    /** 每日投票限制 */
    private Integer dailyVoteLimit;

    /** 已投票的作品ID列表 */
    private List<Long> votedTeamIds;

    /** 已投票的作品名称列表 */
    private List<String> votedTeamNames;

    public VoteStatusVO() {
    }

    public VoteStatusVO(Integer todayVoteCount, Integer dailyVoteLimit, List<Long> votedTeamIds, List<String> votedTeamNames) {
        this.todayVoteCount = todayVoteCount;
        this.dailyVoteLimit = dailyVoteLimit;
        this.remainingVotes = dailyVoteLimit - todayVoteCount;
        this.votedTeamIds = votedTeamIds;
        this.votedTeamNames = votedTeamNames;
    }

    public Integer getTodayVoteCount() {
        return todayVoteCount;
    }

    public void setTodayVoteCount(Integer todayVoteCount) {
        this.todayVoteCount = todayVoteCount;
        if (this.dailyVoteLimit != null) {
            this.remainingVotes = this.dailyVoteLimit - todayVoteCount;
        }
    }

    public Integer getRemainingVotes() {
        return remainingVotes;
    }

    public void setRemainingVotes(Integer remainingVotes) {
        this.remainingVotes = remainingVotes;
    }

    public Integer getDailyVoteLimit() {
        return dailyVoteLimit;
    }

    public void setDailyVoteLimit(Integer dailyVoteLimit) {
        this.dailyVoteLimit = dailyVoteLimit;
        if (this.todayVoteCount != null) {
            this.remainingVotes = dailyVoteLimit - this.todayVoteCount;
        }
    }

    public List<Long> getVotedTeamIds() {
        return votedTeamIds;
    }

    public void setVotedTeamIds(List<Long> votedTeamIds) {
        this.votedTeamIds = votedTeamIds;
    }

    public List<String> getVotedTeamNames() {
        return votedTeamNames;
    }

    public void setVotedTeamNames(List<String> votedTeamNames) {
        this.votedTeamNames = votedTeamNames;
    }
}