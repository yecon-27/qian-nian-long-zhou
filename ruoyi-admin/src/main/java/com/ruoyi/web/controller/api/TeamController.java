package com.ruoyi.web.controller.api;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.annotation.Anonymous;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.system.domain.SystemLongzhouTeam;
import com.ruoyi.system.domain.SystemLongzhouVoteRecord;
import com.ruoyi.system.service.ILongzhouTeamService;
import com.ruoyi.system.service.ILongzhouVoteRecordService;
import java.util.Date;

/**
 * 队伍API控制器
 * 基于实际数据库结构实现的新接口
 * 
 * @author ruoyi
 * @date 2025-01-29
 */
@Anonymous
@RestController
@RequestMapping("/api/teams")
@CrossOrigin(origins = "*")
public class TeamController extends BaseController
{
    @Autowired
    private ILongzhouTeamService longzhouTeamService;

    @Autowired
    private ILongzhouVoteRecordService longzhouVoteRecordService;

    /**
     * 获取队伍列表
     * GET /api/teams/list
     * 用途：投票页面显示所有队伍卡片
     */
    @GetMapping("/list")
    public AjaxResult getTeamList()
    {
        SystemLongzhouTeam longzhouTeam = new SystemLongzhouTeam();
        // 修改：只查询正常状态的队伍（与数据库实际值匹配）
        longzhouTeam.setStatus("0");  // 改为"0"
        
        List<SystemLongzhouTeam> list = longzhouTeamService.selectLongzhouTeamList(longzhouTeam);
        return AjaxResult.success(list);
    }

    /**
     * 获取排行榜
     * GET /api/teams/ranking
     * 用途：排行榜页面显示按票数排序的队伍
     */
    @GetMapping("/ranking")
    public AjaxResult getRanking()
    {
        List<SystemLongzhouTeam> ranking = longzhouTeamService.selectLongzhouTeamRanking();
        return AjaxResult.success(ranking);
    }

    /**
     * 获取队伍详情
     * GET /api/teams/{teamId}
     * 用途：详情页面显示单个队伍详细信息
     */
    @GetMapping("/{teamId}")
    public AjaxResult getTeamDetail(
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
        
        // 获取队伍详情（不自动记录浏览，由前端显式调用view端点）
        SystemLongzhouTeam team = longzhouTeamService.selectLongzhouTeamByTeamId(teamId);
        if (team == null) {
            return AjaxResult.error("队伍不存在");
        }
        return AjaxResult.success(team);
    }

    /**
     * 为队伍投票
     * POST /api/teams/{teamId}/vote
     * 用途：为指定队伍投票
     */
    @PostMapping("/{teamId}/vote")
    public AjaxResult voteForTeam(
        @PathVariable("teamId") Long teamId,
        @RequestHeader(value = "User-ID", required = false) String userId,
        HttpServletRequest request)
    {
        // 从请求头获取用户ID
        Long userIdLong = null;
        if (StringUtils.isNotEmpty(userId))
        {
            try {
                userIdLong = Long.parseLong(userId);
            } catch (NumberFormatException e) {
                return AjaxResult.error("用户ID格式错误");
            }
        } else {
            return AjaxResult.error("用户未登录");
        }
        
        try {
            // 检查队伍是否存在且状态正常
            SystemLongzhouTeam team = longzhouTeamService.selectLongzhouTeamByTeamId(teamId);
            if (team == null) {
                return AjaxResult.error("队伍不存在");
            }
            
            // 检查用户是否已经为该队伍投过票
            SystemLongzhouVoteRecord existingVote = longzhouVoteRecordService.selectUserTeamVote(userIdLong, teamId);
            if (existingVote != null) {
                return AjaxResult.error("您已经为该队伍投过票了");
            }
            
            // 检查用户今日投票总数是否超过限制
            Integer todayVoteCount = longzhouVoteRecordService.selectTodayVoteCount(userIdLong);
            if (todayVoteCount == null) {
                todayVoteCount = 0;
            }
            if (todayVoteCount >= 3) {
                return AjaxResult.error("您今日的投票次数已达上限（最多3票）");
            }
            
            // 获取IP地址
            String ipAddress = getIpAddr(request);
            
            // 创建投票记录
            SystemLongzhouVoteRecord voteRecord = new SystemLongzhouVoteRecord();
            voteRecord.setUserId(userIdLong);
            voteRecord.setTeamId(teamId);
            voteRecord.setVoteTime(new Date());
            voteRecord.setIpAddress(ipAddress);
            voteRecord.setVoteStatus("0"); // 有效投票
            
            // 插入投票记录
            longzhouVoteRecordService.insertLongzhouVoteRecord(voteRecord);
            
            // 更新队伍投票数
            // 更新队伍浏览数
            team.setTotalVotes(team.getTotalVotes() + 1);
            team.setTodayVotes(team.getTodayVotes() + 1);  // 添加这一行
            longzhouTeamService.updateLongzhouTeam(team);
            
            return AjaxResult.success("投票成功");
            
        } catch (Exception e) {
            return AjaxResult.error("投票失败：" + e.getMessage());
        }
    }

    /**
     * 增加浏览量
     * POST /api/teams/{teamId}/view
     * 用途：用户访问详情页时增加浏览量
     */
    @PostMapping("/{teamId}/view")
    public AjaxResult increaseView(
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
        
        try {
            // 记录浏览
            longzhouTeamService.recordView(teamId, userIdLong, ipAddress);
            return AjaxResult.success("浏览量已更新");
        } catch (Exception e) {
            return AjaxResult.error("更新浏览量失败：" + e.getMessage());
        }
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
     * 重新计算排名
     * POST /api/teams/recalculate-rankings
     * 用途：重新计算所有队伍的排名并存储到数据库
     */
    // @PostMapping("/recalculate-rankings")
    // public AjaxResult recalculateRankings()
    // {
    //     try {
    //         int result = longzhouTeamService.recalculateAllRankings();
    //         if (result > 0) {
    //             return AjaxResult.success("排名更新成功");
    //         } else {
    //             return AjaxResult.error("排名更新失败");
    //         }
    //     } catch (Exception e) {
    //         return AjaxResult.error("排名更新异常: " + e.getMessage());
    //     }
    // }
    
    /**
     * 重新计算排名和显示顺序
     * POST /api/teams/recalculate-rankings-and-display-order
     * 用途：重新计算所有队伍的排名和显示顺序并存储到数据库
     */
    @PostMapping("/recalculate-rankings-and-display-order")
    public AjaxResult recalculateRankingsAndDisplayOrder()
    {
        try {
            int result = longzhouTeamService.recalculateAllRankingsAndDisplayOrder();
            if (result > 0) {
                return AjaxResult.success("排名和显示顺序更新成功");
            } else {
                return AjaxResult.error("排名和显示顺序更新失败");
            }
        } catch (Exception e) {
            return AjaxResult.error("排名和显示顺序更新异常: " + e.getMessage());
        }
    }
}