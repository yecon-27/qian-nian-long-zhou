package com.ruoyi.longzhou.controller;

import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.longzhou.domain.LongzhouTeam;
import com.ruoyi.longzhou.service.ILongzhouTeamService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * 龙舟队伍信息Controller
 * 
 * @author Cong
 * @date 2025-07-25
 */
@RestController
@RequestMapping("/longzhou/team")
public class LongzhouTeamController extends BaseController
{
    @Autowired
    private ILongzhouTeamService longzhouTeamService;

    /**
     * 查询龙舟队伍信息列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:team:list')")
    @GetMapping("/list")
    public TableDataInfo list(LongzhouTeam longzhouTeam)
    {
        startPage();
        List<LongzhouTeam> list = longzhouTeamService.selectLongzhouTeamList(longzhouTeam);
        return getDataTable(list);
    }

    /**
     * 导出龙舟队伍信息列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:team:export')")
    @Log(title = "龙舟队伍信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, LongzhouTeam longzhouTeam)
    {
        List<LongzhouTeam> list = longzhouTeamService.selectLongzhouTeamList(longzhouTeam);
        ExcelUtil<LongzhouTeam> util = new ExcelUtil<LongzhouTeam>(LongzhouTeam.class);
        util.exportExcel(response, list, "龙舟队伍信息数据");
    }

    /**
     * 获取龙舟队伍信息详细信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:team:query')")
    @GetMapping(value = "/{teamId}")
    public AjaxResult getInfo(@PathVariable("teamId") Long teamId)
    {
        return success(longzhouTeamService.selectLongzhouTeamByTeamId(teamId));
    }

    /**
     * 新增龙舟队伍信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:team:add')")
    @Log(title = "龙舟队伍信息", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody LongzhouTeam longzhouTeam)
    {
        return toAjax(longzhouTeamService.insertLongzhouTeam(longzhouTeam));
    }

    /**
     * 修改龙舟队伍信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:team:edit')")
    @Log(title = "龙舟队伍信息", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody LongzhouTeam longzhouTeam)
    {
        return toAjax(longzhouTeamService.updateLongzhouTeam(longzhouTeam));
    }

    /**
     * 删除龙舟队伍信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:team:remove')")
    @Log(title = "龙舟队伍信息", businessType = BusinessType.DELETE)
	@DeleteMapping("/{teamIds}")
    public AjaxResult remove(@PathVariable Long[] teamIds)
    {
        return toAjax(longzhouTeamService.deleteLongzhouTeamByTeamIds(teamIds));
    }
}
