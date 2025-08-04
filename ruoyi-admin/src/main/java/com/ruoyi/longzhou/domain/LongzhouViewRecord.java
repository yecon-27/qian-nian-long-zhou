package com.ruoyi.longzhou.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 浏览记录对象 longzhou_view_record
 * 
 * @author Cong
 * @date 2025-07-25
 */
public class LongzhouViewRecord extends BaseEntity {
    private static final long serialVersionUID = 1L;

    /** 浏览记录ID */
    @Excel(name = "浏览记录ID")
    private Long viewId;

    /** 队伍ID */
    @Excel(name = "队伍ID")
    private Long teamId;

    /** 用户ID(关联sys_user.user_id，游客为NULL) */
    @Excel(name = "用户ID(关联sys_user.user_id，游客为NULL)")
    private Long userId;
    
    /** 用户名称 */
    @Excel(name = "用户名称")
    private String userName;
    
    /** 用户昵称 */
    @Excel(name = "用户昵称")
    private String nickName;
    
    /** 队伍名称 */
    @Excel(name = "队伍名称")
    private String teamName;
    
    /** 用户IP */
    @Excel(name = "用户IP")
    private String userIp;

    /** 浏览日期 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "浏览日期", width = 30, dateFormat = "yyyy-MM-dd")
    private Date viewDate;

    /** 浏览时间 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "浏览时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date viewTime;

    /** 浏览时长(秒) */
    @Excel(name = "浏览时长(秒)")
    private Long viewDuration;

    /** 页面类型(list:列表页 detail:详情页) */
    @Excel(name = "页面类型(list:列表页 detail:详情页)")
    private String pageType;

    /** 来源页面 */
    private String referrer;

    /** 用户代理 */
    private String userAgent;

    /** 设备类型(mobile/desktop/tablet) */
    @Excel(name = "设备类型(mobile/desktop/tablet)")
    private String deviceType;

    /** 浏览器类型 */
    @Excel(name = "浏览器类型")
    private String browserType;

    /** 会话ID */
    private String sessionId;

    public void setViewId(Long viewId) 
    {
        this.viewId = viewId;
    }

    public Long getViewId() 
    {
        return viewId;
    }

    public void setTeamId(Long teamId) 
    {
        this.teamId = teamId;
    }

    public Long getTeamId() 
    {
        return teamId;
    }

    public void setUserId(Long userId) 
    {
        this.userId = userId;
    }

    public Long getUserId() 
    {
        return userId;
    }

    public void setUserIp(String userIp) 
    {
        this.userIp = userIp;
    }

    public String getUserIp() 
    {
        return userIp;
    }

    public void setViewDate(Date viewDate) 
    {
        this.viewDate = viewDate;
    }

    public Date getViewDate() 
    {
        return viewDate;
    }

    public void setViewTime(Date viewTime) 
    {
        this.viewTime = viewTime;
    }

    public Date getViewTime() 
    {
        return viewTime;
    }

    public void setViewDuration(Long viewDuration) 
    {
        this.viewDuration = viewDuration;
    }

    public Long getViewDuration() 
    {
        return viewDuration;
    }

    public void setPageType(String pageType) 
    {
        this.pageType = pageType;
    }

    public String getPageType() 
    {
        return pageType;
    }

    public void setReferrer(String referrer) 
    {
        this.referrer = referrer;
    }

    public String getReferrer() 
    {
        return referrer;
    }

    public void setUserAgent(String userAgent) 
    {
        this.userAgent = userAgent;
    }

    public String getUserAgent() 
    {
        return userAgent;
    }

    public void setDeviceType(String deviceType) 
    {
        this.deviceType = deviceType;
    }

    public String getDeviceType() 
    {
        return deviceType;
    }

    public void setBrowserType(String browserType) 
    {
        this.browserType = browserType;
    }

    public String getBrowserType() 
    {
        return browserType;
    }

    public void setSessionId(String sessionId) 
    {
        this.sessionId = sessionId;
    }

    public String getSessionId() 
    {
        return sessionId;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("viewId", getViewId())
            .append("teamId", getTeamId())
            .append("userId", getUserId())
            .append("userIp", getUserIp())
            .append("viewDate", getViewDate())
            .append("viewTime", getViewTime())
            .append("viewDuration", getViewDuration())
            .append("pageType", getPageType())
            .append("referrer", getReferrer())
            .append("userAgent", getUserAgent())
            .append("deviceType", getDeviceType())
            .append("browserType", getBrowserType())
            .append("sessionId", getSessionId())
            .append("createTime", getCreateTime())
            .toString();
    }

    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getNickName() {
        return nickName;
    }
    
    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    
    public String getTeamName() {
        return teamName;
    }
    
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
