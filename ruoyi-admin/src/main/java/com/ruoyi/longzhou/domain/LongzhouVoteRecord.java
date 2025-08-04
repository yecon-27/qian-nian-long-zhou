package com.ruoyi.longzhou.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 投票记录-每日每用户每队伍限投1次对象 longzhou_vote_record
 * 
 * @author Cong
 * @date 2025-07-25
 */
public class LongzhouVoteRecord extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 投票记录ID */
    @Excel(name = "投票记录ID")
    private Long voteId;

    /** 用户ID(关联sys_user.user_id) */
    @Excel(name = "用户ID(关联sys_user.user_id)")
    private Long userId;

    /** 队伍ID */
    @Excel(name = "队伍ID")
    private Long teamId;

    /** 投票日期 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "投票日期", width = 30, dateFormat = "yyyy-MM-dd")
    private Date voteDate;

    /** 投票时间 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "投票时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date voteTime;

    /** 用户IP地址 */
    @Excel(name = "用户IP地址")
    private String userIp;

    /** 用户代理信息 */
    private String userAgent;

    /** 状态(1:有效 0:无效) */
    @Excel(name = "状态(1:有效 0:无效)")
    private Integer status;

    public void setVoteId(Long voteId) 
    {
        this.voteId = voteId;
    }

    public Long getVoteId() 
    {
        return voteId;
    }

    public void setUserId(Long userId) 
    {
        this.userId = userId;
    }

    public Long getUserId() 
    {
        return userId;
    }

    public void setTeamId(Long teamId) 
    {
        this.teamId = teamId;
    }

    public Long getTeamId() 
    {
        return teamId;
    }

    public void setVoteDate(Date voteDate) 
    {
        this.voteDate = voteDate;
    }

    public Date getVoteDate() 
    {
        return voteDate;
    }

    public void setVoteTime(Date voteTime) 
    {
        this.voteTime = voteTime;
    }

    public Date getVoteTime() 
    {
        return voteTime;
    }

    public void setUserIp(String userIp) 
    {
        this.userIp = userIp;
    }

    public String getUserIp() 
    {
        return userIp;
    }

    public void setUserAgent(String userAgent) 
    {
        this.userAgent = userAgent;
    }

    public String getUserAgent() 
    {
        return userAgent;
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
            .append("voteId", getVoteId())
            .append("userId", getUserId())
            .append("teamId", getTeamId())
            .append("voteDate", getVoteDate())
            .append("voteTime", getVoteTime())
            .append("userIp", getUserIp())
            .append("userAgent", getUserAgent())
            .append("status", getStatus())
            .append("createBy", getCreateBy())
            .append("createTime", getCreateTime())
            .append("updateBy", getUpdateBy())
            .append("updateTime", getUpdateTime())
            .toString();
    }
    
    /** 用户名 */
    private String userName;
    
    /** 队伍名称 */
    private String teamName;
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getTeamName() {
        return teamName;
    }
    
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
