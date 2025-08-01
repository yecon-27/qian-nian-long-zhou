package com.ruoyi.longzhou.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 龙舟队伍信息对象 longzhou_team
 * 
 * @author Cong
 * @date 2025-07-25
 */
public class LongzhouTeam extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 队伍ID */
    @Excel(name = "队伍ID")
    private Long teamId;

    /** 队伍名称 */
    @Excel(name = "队伍名称")
    private String teamName;

    /** 队长/负责人 */
    @Excel(name = "队长/负责人")
    private String teamLeader;

    /** 队伍描述 */
    private String teamDescription;

    /** 队伍主图 */
    private String teamImage;

    /** 所属活动ID */
    @Excel(name = "所属活动ID")
    private Long activityId;

    /** 总投票数 */
    @Excel(name = "总投票数")
    private Long totalVotes;

    /** 今日投票数 */
    @Excel(name = "今日投票数")
    private Long todayVotes;

    /** 总浏览数 */
    @Excel(name = "总浏览数")
    private Long totalViews;

    /** 今日浏览数 */
    @Excel(name = "今日浏览数")
    private Long todayViews;

    /** 当前排名 */
    @Excel(name = "当前排名")
    private Long ranking;

    /** 显示顺序 */
    @Excel(name = "显示顺序")
    private Long displayOrder;

    /** 状态(1:正常 2:隐藏 0:删除) */
    @Excel(name = "状态(1:正常 2:隐藏 0:删除)")
    private Integer status;

    public void setTeamId(Long teamId) 
    {
        this.teamId = teamId;
    }

    public Long getTeamId() 
    {
        return teamId;
    }

    public void setTeamName(String teamName) 
    {
        this.teamName = teamName;
    }

    public String getTeamName() 
    {
        return teamName;
    }

    public void setTeamLeader(String teamLeader) 
    {
        this.teamLeader = teamLeader;
    }

    public String getTeamLeader() 
    {
        return teamLeader;
    }

    public void setTeamDescription(String teamDescription) 
    {
        this.teamDescription = teamDescription;
    }

    public String getTeamDescription() 
    {
        return teamDescription;
    }

    public void setTeamImage(String teamImage) 
    {
        this.teamImage = teamImage;
    }

    public String getTeamImage() 
    {
        return teamImage;
    }

    public void setActivityId(Long activityId) 
    {
        this.activityId = activityId;
    }

    public Long getActivityId() 
    {
        return activityId;
    }

    public void setTotalVotes(Long totalVotes) 
    {
        this.totalVotes = totalVotes;
    }

    public Long getTotalVotes() 
    {
        return totalVotes;
    }

    public void setTodayVotes(Long todayVotes) 
    {
        this.todayVotes = todayVotes;
    }

    public Long getTodayVotes() 
    {
        return todayVotes;
    }

    public void setTotalViews(Long totalViews) 
    {
        this.totalViews = totalViews;
    }

    public Long getTotalViews() 
    {
        return totalViews;
    }

    public void setTodayViews(Long todayViews) 
    {
        this.todayViews = todayViews;
    }

    public Long getTodayViews() 
    {
        return todayViews;
    }

    public void setRanking(Long ranking) 
    {
        this.ranking = ranking;
    }

    public Long getRanking() 
    {
        return ranking;
    }

    public void setDisplayOrder(Long displayOrder) 
    {
        this.displayOrder = displayOrder;
    }

    public Long getDisplayOrder() 
    {
        return displayOrder;
    }

    public void setStatus(Integer status) 
    {
        this.status = status;
    }

    public Integer getStatus() 
    {
        return status;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("teamId", getTeamId())
            .append("teamName", getTeamName())
            .append("teamLeader", getTeamLeader())
            .append("teamDescription", getTeamDescription())
            .append("teamImage", getTeamImage())
            .append("activityId", getActivityId())
            .append("totalVotes", getTotalVotes())
            .append("todayVotes", getTodayVotes())
            .append("totalViews", getTotalViews())
            .append("todayViews", getTodayViews())
            .append("ranking", getRanking())
            .append("displayOrder", getDisplayOrder())
            .append("status", getStatus())
            .append("createTime", getCreateTime())
            .append("updateTime", getUpdateTime())
            .toString();
    }
}
