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
import com.ruoyi.longzhou.domain.LongzhouVoteRecord;
import com.ruoyi.longzhou.service.ILongzhouVoteRecordService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * 投票记录-每日每用户每队伍限投1次Controller
 * 
 * @author Cong
 * @date 2025-07-25
 */
@RestController
@RequestMapping("/longzhou/voteRecord")
public class LongzhouVoteRecordController extends BaseController
{
    @Autowired
    private ILongzhouVoteRecordService longzhouVoteRecordService;

    /**
     * 查询投票记录-每日每用户每队伍限投1次列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:voteRecord:list')")
    @GetMapping("/list")
    public TableDataInfo list(LongzhouVoteRecord longzhouVoteRecord)
    {
        startPage();
        List<LongzhouVoteRecord> list = longzhouVoteRecordService.selectLongzhouVoteRecordList(longzhouVoteRecord);
        return getDataTable(list);
    }

    /**
     * 导出投票记录-每日每用户每队伍限投1次列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:voteRecord:export')")
    @Log(title = "投票记录-每日每用户每队伍限投1次", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, LongzhouVoteRecord longzhouVoteRecord)
    {
        List<LongzhouVoteRecord> list = longzhouVoteRecordService.selectLongzhouVoteRecordList(longzhouVoteRecord);
        ExcelUtil<LongzhouVoteRecord> util = new ExcelUtil<LongzhouVoteRecord>(LongzhouVoteRecord.class);
        util.exportExcel(response, list, "投票记录-每日每用户每队伍限投1次数据");
    }

    /**
     * 获取投票记录-每日每用户每队伍限投1次详细信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:voteRecord:query')")
    @GetMapping(value = "/{voteId}")
    public AjaxResult getInfo(@PathVariable("voteId") Long voteId)
    {
        return success(longzhouVoteRecordService.selectLongzhouVoteRecordByVoteId(voteId));
    }

    /**
     * 新增投票记录-每日每用户每队伍限投1次
     */
    @PreAuthorize("@ss.hasPermi('longzhou:voteRecord:add')")
    @Log(title = "投票记录-每日每用户每队伍限投1次", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody LongzhouVoteRecord longzhouVoteRecord)
    {
        return toAjax(longzhouVoteRecordService.insertLongzhouVoteRecord(longzhouVoteRecord));
    }

    /**
     * 修改投票记录-每日每用户每队伍限投1次
     */
    @PreAuthorize("@ss.hasPermi('longzhou:voteRecord:edit')")
    @Log(title = "投票记录-每日每用户每队伍限投1次", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody LongzhouVoteRecord longzhouVoteRecord)
    {
        return toAjax(longzhouVoteRecordService.updateLongzhouVoteRecord(longzhouVoteRecord));
    }

    /**
     * 删除投票记录-每日每用户每队伍限投1次
     */
    @PreAuthorize("@ss.hasPermi('longzhou:voteRecord:remove')")
    @Log(title = "投票记录-每日每用户每队伍限投1次", businessType = BusinessType.DELETE)
	@DeleteMapping("/{voteIds}")
    public AjaxResult remove(@PathVariable Long[] voteIds)
    {
        return toAjax(longzhouVoteRecordService.deleteLongzhouVoteRecordByVoteIds(voteIds));
    }
}
