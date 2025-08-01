package com.ruoyi.longzhou.service;

import java.util.List;
import com.ruoyi.longzhou.domain.LongzhouTeam;

/**
 * 龙舟队伍信息Service接口
 * 
 * @author Cong
 * @date 2025-07-25
 */
public interface ILongzhouTeamService 
{
    /**
     * 查询龙舟队伍信息
     * 
     * @param teamId 龙舟队伍信息主键
     * @return 龙舟队伍信息
     */
    public LongzhouTeam selectLongzhouTeamByTeamId(Long teamId);

    /**
     * 查询龙舟队伍信息列表
     * 
     * @param longzhouTeam 龙舟队伍信息
     * @return 龙舟队伍信息集合
     */
    public List<LongzhouTeam> selectLongzhouTeamList(LongzhouTeam longzhouTeam);

    /**
     * 新增龙舟队伍信息
     * 
     * @param longzhouTeam 龙舟队伍信息
     * @return 结果
     */
    public int insertLongzhouTeam(LongzhouTeam longzhouTeam);

    /**
     * 修改龙舟队伍信息
     * 
     * @param longzhouTeam 龙舟队伍信息
     * @return 结果
     */
    public int updateLongzhouTeam(LongzhouTeam longzhouTeam);

    /**
     * 批量删除龙舟队伍信息
     * 
     * @param teamIds 需要删除的龙舟队伍信息主键集合
     * @return 结果
     */
    public int deleteLongzhouTeamByTeamIds(Long[] teamIds);

    /**
     * 删除龙舟队伍信息信息
     * 
     * @param teamId 龙舟队伍信息主键
     * @return 结果
     */
    public int deleteLongzhouTeamByTeamId(Long teamId);

    /**
     * 记录浏览行为
     * 
     * @param teamId 队伍ID
     * @param userId 用户ID
     * @param ipAddress IP地址
     * @return 结果
     */
    public int recordView(Long teamId, Long userId, String ipAddress);

    /**
     * 获取队伍排行榜
     * 
     * @return 队伍排行榜列表
     */
    public List<LongzhouTeam> selectLongzhouTeamRanking();
}
