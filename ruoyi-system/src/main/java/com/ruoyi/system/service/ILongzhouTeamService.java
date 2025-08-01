package com.ruoyi.system.service;

import java.util.List;
import com.ruoyi.system.domain.SystemLongzhouTeam;

/**
 * 龙舟队伍（作品）Service接口
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public interface ILongzhouTeamService 
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
     * 批量删除龙舟队伍（作品）
     * 
     * @param teamIds 需要删除的龙舟队伍（作品）主键集合
     * @return 结果
     */
    public int deleteLongzhouTeamByTeamIds(Long[] teamIds);

    /**
     * 删除龙舟队伍（作品）信息
     * 
     * @param teamId 龙舟队伍（作品）主键
     * @return 结果
     */
    public int deleteLongzhouTeamByTeamId(Long teamId);

    /**
     * 记录浏览行为
     * 
     * @param teamId 队伍ID
     * @param userId 用户ID（可为null）
     * @param ipAddress IP地址
     * @return 结果
     */
    public int recordView(Long teamId, Long userId, String ipAddress);
}