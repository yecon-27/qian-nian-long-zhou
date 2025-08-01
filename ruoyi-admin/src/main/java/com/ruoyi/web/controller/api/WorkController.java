package com.ruoyi.web.controller.api;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.SystemLongzhouTeam;
import com.ruoyi.system.service.ILongzhouTeamService;

/**
 * 作品API控制器
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
@RestController
@RequestMapping("/api/works")
@CrossOrigin(origins = "*")
public class WorkController extends BaseController
{
    @Autowired
    private ILongzhouTeamService longzhouTeamService;

    /**
     * 查询作品列表
     */
    @GetMapping
    public TableDataInfo list(
        @RequestParam(defaultValue = "1") int pageNum,
        @RequestParam(defaultValue = "10") int pageSize,
        @RequestParam(required = false) String category,
        @RequestParam(defaultValue = "totalVotes") String orderByColumn,
        @RequestParam(defaultValue = "desc") String isAsc,
        @RequestParam(required = false) String teamName,
        @RequestHeader(value = "User-ID", required = false) String userId,
        HttpServletRequest request)
    {
        startPage();
        SystemLongzhouTeam longzhouTeam = new SystemLongzhouTeam();
        if (StringUtils.isNotEmpty(teamName))
        {
            longzhouTeam.setTeamName(teamName);
        }
        // 只查询正常状态的作品
        longzhouTeam.setStatus("0");
        
        List<SystemLongzhouTeam> list = longzhouTeamService.selectLongzhouTeamList(longzhouTeam);
        return getDataTable(list);
    }

    /**
     * 获取作品详细信息
     */
    @GetMapping(value = "/{teamId}")
    public AjaxResult getInfo(
        @PathVariable("teamId") Long teamId,
        @RequestHeader(value = "User-ID", required = false) String userId,
        @RequestHeader(value = "User-IP", required = false) String userIp,
        HttpServletRequest request)
    {
        // 记录浏览行为
        String ipAddress = userIp;
        if (StringUtils.isEmpty(ipAddress))
        {
            ipAddress = getIpAddr(request);
        }
        
        Long userIdLong = null;
        if (StringUtils.isNotEmpty(userId))
        {
            try {
                userIdLong = Long.parseLong(userId);
            } catch (NumberFormatException e) {
                // 忽略转换错误，使用null
            }
        }
        
        // 记录浏览
        longzhouTeamService.recordView(teamId, userIdLong, ipAddress);
        
        // 获取作品详情
        SystemLongzhouTeam work = longzhouTeamService.selectLongzhouTeamByTeamId(teamId);
        return AjaxResult.success(work);
    }

    /**
     * 获取作品排行榜
     */
    @GetMapping("/ranking")
    public AjaxResult getRanking(
        @RequestParam(defaultValue = "10") int limit,
        @RequestParam(defaultValue = "total") String type)
    {
        List<SystemLongzhouTeam> ranking = longzhouTeamService.selectLongzhouTeamRanking();
        
        // 限制返回数量
        if (ranking.size() > limit)
        {
            ranking = ranking.subList(0, limit);
        }
        
        return AjaxResult.success(ranking);
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
}