package com.ruoyi.system.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 龙舟投票记录对象 longzhou_vote_record - 系统API
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public class SystemLongzhouVoteRecord extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 投票记录ID */
    private Long voteId;

    /** 用户ID */
    @Excel(name = "用户ID")
    private Long userId;

    /** 队伍ID */
    @Excel(name = "队伍ID")
    private Long teamId;

    /** 投票时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Excel(name = "投票时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
    private Date voteTime;

    /** IP地址 */
    @Excel(name = "IP地址")
    private String ipAddress;

    /** 投票状态（0有效 1无效/已取消） */
    @Excel(name = "投票状态", readConverterExp = "0=有效,1=无效/已取消")
    private String voteStatus;

    /** 取消时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Excel(name = "取消时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
    private Date cancelTime;

    /** 队伍名称（关联查询字段） */
    private String teamName;

    /** 用户名称（关联查询字段） */
    private String userName;

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
    public void setVoteTime(Date voteTime) 
    {
        this.voteTime = voteTime;
    }

    public Date getVoteTime() 
    {
        return voteTime;
    }
    public void setIpAddress(String ipAddress) 
    {
        this.ipAddress = ipAddress;
    }

    public String getIpAddress() 
    {
        return ipAddress;
    }
    
    // 兼容性方法：为了兼容Mapper中的userIp字段名
    public String getUserIp() 
    {
        return ipAddress;
    }
    
    public void setUserIp(String userIp) 
    {
        this.ipAddress = userIp;
    }
    public void setVoteStatus(String voteStatus) 
    {
        this.voteStatus = voteStatus;
    }

    public String getVoteStatus() 
    {
        return voteStatus;
    }
    public void setCancelTime(Date cancelTime) 
    {
        this.cancelTime = cancelTime;
    }

    public Date getCancelTime() 
    {
        return cancelTime;
    }

    public String getTeamName() 
    {
        return teamName;
    }

    public void setTeamName(String teamName) 
    {
        this.teamName = teamName;
    }

    public String getUserName() 
    {
        return userName;
    }

    public void setUserName(String userName) 
    {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("voteId", getVoteId())
            .append("userId", getUserId())
            .append("teamId", getTeamId())
            .append("voteTime", getVoteTime())
            .append("ipAddress", getIpAddress())
            .append("voteStatus", getVoteStatus())
            .append("cancelTime", getCancelTime())
            .append("teamName", getTeamName())
            .append("userName", getUserName())
            .toString();
    }
}