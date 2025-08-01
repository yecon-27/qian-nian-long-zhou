package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.SystemLongzhouTeamMapper;
import com.ruoyi.system.domain.SystemLongzhouTeam;
import com.ruoyi.system.service.ILongzhouTeamService;

/**
 * 龙舟队伍（作品）Service业务层处理 - 游客API
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
@Service("systemLongzhouTeamService")
public class LongzhouTeamServiceImpl implements ILongzhouTeamService 
{
    @Autowired
    private SystemLongzhouTeamMapper longzhouTeamMapper;

    /**
     * 查询龙舟队伍（作品）
     * 
     * @param teamId 龙舟队伍（作品）主键
     * @return 龙舟队伍（作品）
     */
    @Override
    public SystemLongzhouTeam selectLongzhouTeamByTeamId(Long teamId)
    {
        return longzhouTeamMapper.selectLongzhouTeamByTeamId(teamId);
    }

    /**
     * 查询龙舟队伍（作品）列表
     * 
     * @param longzhouTeam 龙舟队伍（作品）
     * @return 龙舟队伍（作品）
     */
    @Override
    public List<SystemLongzhouTeam> selectLongzhouTeamList(SystemLongzhouTeam longzhouTeam)
    {
        return longzhouTeamMapper.selectLongzhouTeamList(longzhouTeam);
    }

    /**
     * 查询排行榜（按票数降序）
     * 
     * @return 龙舟队伍（作品）
     */
    @Override
    public List<SystemLongzhouTeam> selectLongzhouTeamRanking()
    {
        return longzhouTeamMapper.selectLongzhouTeamRanking();
    }

    /**
     * 新增龙舟队伍（作品）
     * 
     * @param longzhouTeam 龙舟队伍（作品）
     * @return 结果
     */
    @Override
    public int insertLongzhouTeam(SystemLongzhouTeam longzhouTeam)
    {
        return longzhouTeamMapper.insertLongzhouTeam(longzhouTeam);
    }

    /**
     * 修改龙舟队伍（作品）
     * 
     * @param longzhouTeam 龙舟队伍（作品）
     * @return 结果
     */
    @Override
    public int updateLongzhouTeam(SystemLongzhouTeam longzhouTeam)
    {
        return longzhouTeamMapper.updateLongzhouTeam(longzhouTeam);
    }

    /**
     * 批量删除龙舟队伍（作品）
     * 
     * @param teamIds 需要删除的龙舟队伍（作品）主键
     * @return 结果
     */
    @Override
    public int deleteLongzhouTeamByTeamIds(Long[] teamIds)
    {
        return longzhouTeamMapper.deleteLongzhouTeamByTeamIds(teamIds);
    }

    /**
     * 删除龙舟队伍（作品）信息
     * 
     * @param teamId 龙舟队伍（作品）主键
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
     * @param userId 用户ID（可为null）
     * @param ipAddress IP地址
     * @return 结果
     */
    @Override
    public int recordView(Long teamId, Long userId, String ipAddress)
    {
        System.out.println("🔍 开始记录浏览: teamId=" + teamId + ", userId=" + userId + ", ipAddress=" + ipAddress);
        
        try {
            // 1. 插入浏览记录到 longzhou_view_record 表
            System.out.println("🔍 尝试插入浏览记录...");
            int insertResult = longzhouTeamMapper.insertViewRecord(teamId, userId, ipAddress);
            System.out.println("✅ 插入浏览记录成功，影响行数: " + insertResult);
            
            // 2. 更新队伍浏览数到 longzhou_team 表
            System.out.println("🔍 尝试更新队伍浏览数...");
            int updateResult = longzhouTeamMapper.updateViewCount(teamId);
            System.out.println("✅ 更新队伍浏览数成功，影响行数: " + updateResult);
            
            return updateResult;
        } catch (Exception e) {
            // 如果插入浏览记录失败，至少要更新浏览数
            System.err.println("❌ 插入浏览记录失败: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            e.printStackTrace();
            
            try {
                System.out.println("🔄 尝试仅更新浏览数...");
                int fallbackResult = longzhouTeamMapper.updateViewCount(teamId);
                System.out.println("✅ 仅更新浏览数成功，影响行数: " + fallbackResult);
                return fallbackResult;
            } catch (Exception fallbackException) {
                System.err.println("❌ 更新浏览数也失败: " + fallbackException.getMessage());
                throw fallbackException;
            }
        }
    }
}