package com.ruoyi.web.controller.api;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.vo.VoteStatusVO;
import com.ruoyi.system.service.ILongzhouVoteRecordService;

/**
 * 投票API控制器
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
@RestController
@RequestMapping("/api/vote")
@CrossOrigin(origins = "*")
public class VoteController extends BaseController
{
    @Autowired
    private ILongzhouVoteRecordService longzhouVoteRecordService;

    /**
     * 执行投票
     */
    @PostMapping
    public AjaxResult vote(@RequestBody VoteRequest request, HttpServletRequest httpRequest)
    {
        // 获取IP地址
        String ipAddress = request.getUserIp();
        if (StringUtils.isEmpty(ipAddress))
        {
            ipAddress = getIpAddr(httpRequest);
        }
        
        // 执行投票
        String result = longzhouVoteRecordService.executeVote(
            Long.parseLong(request.getUserId()), 
            request.getWorkId(), 
            ipAddress
        );
        
        if ("投票成功".equals(result))  // ✅ 直接判断成功消息
        {
            // 投票成功，返回更新后的状态
            VoteStatusVO status = longzhouVoteRecordService.getUserVoteStatus(Long.parseLong(request.getUserId()));
            return AjaxResult.success("投票成功").put("data", status);
        }
        else
        {
            // 投票失败，返回错误信息
            return AjaxResult.error(result);
        }
    }

    /**
     * 取消投票
     */
    @DeleteMapping
    public AjaxResult cancelVote(@RequestBody CancelVoteRequest request)
    {
        int result = longzhouVoteRecordService.cancelVote(
            Long.parseLong(request.getUserId()), 
            request.getWorkId()
        );
        
        if (result > 0)
        {
            // 取消成功，返回更新后的状态
            VoteStatusVO status = longzhouVoteRecordService.getUserVoteStatus(Long.parseLong(request.getUserId()));
            return AjaxResult.success("取消投票成功").put("data", status);
        }
        else
        {
            return AjaxResult.error("取消投票失败");
        }
    }

    /**
     * 获取用户投票状态
     */
    @GetMapping("/status/{userId}")
    public AjaxResult getUserVoteStatus(@PathVariable String userId)
    {
        // 添加调试日志
        System.out.println("🔍 查询用户投票状态: userId=" + userId);
        
        VoteStatusVO status = longzhouVoteRecordService.getUserVoteStatus(Long.parseLong(userId));
        
        // 添加返回结果日志
        System.out.println("🔍 投票状态查询结果: " + status.toString());
        
        return AjaxResult.success(status);
    }

    /**
     * 获取客户端IP地址
     */
    private String getIpAddr(HttpServletRequest request)
    {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 投票请求DTO
     */
    public static class VoteRequest
    {
        private String userId;
        private Long workId;
        private String userIp;
        private String userAgent;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public Long getWorkId() {
            return workId;
        }

        public void setWorkId(Long workId) {
            this.workId = workId;
        }

        public String getUserIp() {
            return userIp;
        }

        public void setUserIp(String userIp) {
            this.userIp = userIp;
        }

        public String getUserAgent() {
            return userAgent;
        }

        public void setUserAgent(String userAgent) {
            this.userAgent = userAgent;
        }
    }

    /**
     * 取消投票请求DTO
     */
    public static class CancelVoteRequest
    {
        private String userId;
        private Long workId;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public Long getWorkId() {
            return workId;
        }

        public void setWorkId(Long workId) {
            this.workId = workId;
        }
    }
}