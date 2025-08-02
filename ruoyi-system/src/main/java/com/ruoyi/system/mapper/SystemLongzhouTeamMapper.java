package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.SystemLongzhouTeam;

/**
 * 龙舟队伍（作品）Mapper接口 - 系统API
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public interface SystemLongzhouTeamMapper 
{
    /**
     * 查询龙舟队伍（作品）
     * 
     * @param teamId 龙舟队伍（作品）主键
     * @return 龙舟队伍（作品）
     */
    public SystemLongzhouTeam selectLongzhouTeamByTeamId(Long teamId);

    /**
     * 查询龙舟队伍（作品）列表
     * 
     * @param longzhouTeam 龙舟队伍（作品）
     * @return 龙舟队伍（作品）集合
     */
    public List<SystemLongzhouTeam> selectLongzhouTeamList(SystemLongzhouTeam longzhouTeam);

    /**
     * 查询排行榜（按票数降序）
     * 
     * @return 龙舟队伍（作品）集合
     */
    public List<SystemLongzhouTeam> selectLongzhouTeamRanking();

    /**
     * 新增龙舟队伍（作品）
     * 
     * @param longzhouTeam 龙舟队伍（作品）
     * @return 结果
     */
    public int insertLongzhouTeam(SystemLongzhouTeam longzhouTeam);

    /**
     * 修改龙舟队伍（作品）
     * 
     * @param longzhouTeam 龙舟队伍（作品）
     * @return 结果
     */
    public int updateLongzhouTeam(SystemLongzhouTeam longzhouTeam);

    /**
     * 删除龙舟队伍（作品）
     * 
     * @param teamId 龙舟队伍（作品）主键
     * @return 结果
     */
    public int deleteLongzhouTeamByTeamId(Long teamId);

    /**
     * 批量删除龙舟队伍（作品）
     * 
     * @param teamIds 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteLongzhouTeamByTeamIds(Long[] teamIds);

    /**
     * 插入浏览记录
     * 
     * @param teamId 队伍ID
     * @param userId 用户ID（可为null）
     * @param ipAddress IP地址
     * @return 结果
     */
    public int insertViewRecord(Long teamId, Long userId, String ipAddress);

    /**
     * 更新队伍浏览数
     * 
     * @param teamId 队伍ID
     * @return 结果
     */
    public int updateViewCount(Long teamId);

    /**
     * 记录浏览行为（组合操作）
     * 
     * @param teamId 队伍ID
     * @param userId 用户ID（可为null）
     * @param ipAddress IP地址
     * @return 结果
     */
    public int recordView(Long teamId, Long userId, String ipAddress);

    /**
     * 增加队伍票数
     * 
     * @param teamId 队伍ID
     * @return 结果
     */
    public int increaseVoteCount(Long teamId);

    /**
     * 减少队伍票数
     * 
     * @param teamId 队伍ID
     * @return 结果
     */
    public int decreaseVoteCount(Long teamId);

    /**
     * 批量更新队伍排名
     * 
     * @param teams 队伍列表（包含排名信息）
     * @return 结果
     */
    public int updateTeamRankings(List<SystemLongzhouTeam> teams);

    /**
     * 重新计算并更新所有队伍排名和显示顺序
     * 
     * @return 结果
     */
    public int recalculateAllRankingsAndDisplayOrder();
}