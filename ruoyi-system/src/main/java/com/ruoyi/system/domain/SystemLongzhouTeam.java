package com.ruoyi.system.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 龙舟队伍（作品）对象 longzhou_team - 系统API
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public class SystemLongzhouTeam extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 队伍ID */
    private Long teamId;

    /** 队伍名称 */
    @Excel(name = "队伍名称")
    private String teamName;

    /** 队伍描述 */
    @Excel(name = "队伍描述")
    private String description;

    /** 队长姓名 */
    @Excel(name = "队长姓名")
    private String captainName;

    /** 队伍图片 */
    @Excel(name = "队伍图片")
    private String teamImage;

    /** 活动ID */
    @Excel(name = "活动ID")
    private Long activityId;

    /** 今日票数 */
    @Excel(name = "今日票数")
    private Long todayVotes;

    /** 今日浏览数 */
    @Excel(name = "今日浏览数")
    private Long todayViews;

    /** 排名 */
    @Excel(name = "排名")
    private Integer ranking;

    /** 显示顺序 */
    @Excel(name = "显示顺序")
    private Integer displayOrder;

    /** 总票数 */
    @Excel(name = "总票数")
    private Long totalVotes;

    /** 浏览次数 */
    @Excel(name = "浏览次数")
    private Long viewCount;

    /** 状态（0正常 1停用） */
    @Excel(name = "状态", readConverterExp = "0=正常,1=停用")
    private String status;

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
    public void setDescription(String description) 
    {
        this.description = description;
    }

    public String getDescription() 
    {
        return description;
    }
    public void setCaptainName(String captainName) 
    {
        this.captainName = captainName;
    }

    public String getCaptainName() 
    {
        return captainName;
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
    public void setTodayVotes(Long todayVotes) 
    {
        this.todayVotes = todayVotes;
    }

    public Long getTodayVotes() 
    {
        return todayVotes;
    }
    public void setTodayViews(Long todayViews) 
    {
        this.todayViews = todayViews;
    }

    public Long getTodayViews() 
    {
        return todayViews;
    }
    public void setRanking(Integer ranking) 
    {
        this.ranking = ranking;
    }

    public Integer getRanking() 
    {
        return ranking;
    }
    public void setDisplayOrder(Integer displayOrder) 
    {
        this.displayOrder = displayOrder;
    }

    public Integer getDisplayOrder() 
    {
        return displayOrder;
    }
    public void setTotalVotes(Long totalVotes) 
    {
        this.totalVotes = totalVotes;
    }

    public Long getTotalVotes() 
    {
        return totalVotes;
    }
    public void setViewCount(Long viewCount) 
    {
        this.viewCount = viewCount;
    }

    public Long getViewCount() 
    {
        return viewCount;
    }
    public void setStatus(String status) 
    {
        this.status = status;
    }

    public String getStatus() 
    {
        return status;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("teamId", getTeamId())
            .append("teamName", getTeamName())
            .append("description", getDescription())
            .append("captainName", getCaptainName())
            .append("teamImage", getTeamImage())
            .append("activityId", getActivityId())
            .append("totalVotes", getTotalVotes())
            .append("todayVotes", getTodayVotes())
            .append("viewCount", getViewCount())
            .append("todayViews", getTodayViews())
            .append("ranking", getRanking())
            .append("displayOrder", getDisplayOrder())
            .append("status", getStatus())
            .append("createTime", getCreateTime())
            .append("updateTime", getUpdateTime())
            .toString();
    }
}