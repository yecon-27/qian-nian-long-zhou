package com.ruoyi.longzhou.service.impl;

import java.util.List;
import com.ruoyi.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.longzhou.mapper.LongzhouTeamMapper;
import com.ruoyi.longzhou.domain.LongzhouTeam;
import com.ruoyi.longzhou.service.ILongzhouTeamService;

/**
 * 龙舟队伍信息Service业务层处理
 * 
 * @author Cong
 * @date 2025-07-25
 */
@Service
public class LongzhouTeamServiceImpl implements ILongzhouTeamService 
{
    @Autowired
    private LongzhouTeamMapper longzhouTeamMapper;

    /**
     * 查询龙舟队伍信息
     * 
     * @param teamId 龙舟队伍信息主键
     * @return 龙舟队伍信息
     */
    @Override
    public LongzhouTeam selectLongzhouTeamByTeamId(Long teamId)
    {
        return longzhouTeamMapper.selectLongzhouTeamByTeamId(teamId);
    }

    /**
     * 查询龙舟队伍信息列表
     * 
     * @param longzhouTeam 龙舟队伍信息
     * @return 龙舟队伍信息
     */
    @Override
    public List<LongzhouTeam> selectLongzhouTeamList(LongzhouTeam longzhouTeam)
    {
        return longzhouTeamMapper.selectLongzhouTeamList(longzhouTeam);
    }

    /**
     * 新增龙舟队伍信息
     * 
     * @param longzhouTeam 龙舟队伍信息
     * @return 结果
     */
    @Override
    public int insertLongzhouTeam(LongzhouTeam longzhouTeam)
    {
        longzhouTeam.setCreateTime(DateUtils.getNowDate());
        return longzhouTeamMapper.insertLongzhouTeam(longzhouTeam);
    }

    /**
     * 修改龙舟队伍信息
     * 
     * @param longzhouTeam 龙舟队伍信息
     * @return 结果
     */
    @Override
    public int updateLongzhouTeam(LongzhouTeam longzhouTeam)
    {
        longzhouTeam.setUpdateTime(DateUtils.getNowDate());
        return longzhouTeamMapper.updateLongzhouTeam(longzhouTeam);
    }

    /**
     * 批量删除龙舟队伍信息
     * 
     * @param teamIds 需要删除的龙舟队伍信息主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouTeamByTeamIds(Long[] teamIds)
    {
        return longzhouTeamMapper.deleteLongzhouTeamByTeamIds(teamIds);
    }

    /**
     * 删除龙舟队伍信息信息
     * 
     * @param teamId 龙舟队伍信息主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouTeamByTeamId(Long teamId)
    {
        return longzhouTeamMapper.deleteLongzhouTeamByTeamId(teamId);
    }

    /**
     * 记录浏览行为
     * 
     * @param teamId 队伍ID
     * @param userId 用户ID
     * @param ipAddress IP地址
     * @return 结果
     */
    @Override
    public int recordView(Long teamId, Long userId, String ipAddress)
    {
        return longzhouTeamMapper.recordView(teamId, userId, ipAddress);
    }

    /**
     * 获取队伍排行榜
     * 
     * @return 队伍排行榜列表
     */
    @Override
    public List<LongzhouTeam> selectLongzhouTeamRanking()
    {
        return longzhouTeamMapper.selectLongzhouTeamRanking();
    }
}
