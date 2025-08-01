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
import com.ruoyi.longzhou.domain.LongzhouViewRecord;
import com.ruoyi.longzhou.service.ILongzhouViewRecordService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * 浏览记录Controller
 * 
 * @author Cong
 * @date 2025-07-25
 */
@RestController
@RequestMapping("/longzhou/viewRecord")
public class LongzhouViewRecordController extends BaseController
{
    @Autowired
    private ILongzhouViewRecordService longzhouViewRecordService;

    /**
     * 查询浏览记录列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:viewRecord:list')")
    @GetMapping("/list")
    public TableDataInfo list(LongzhouViewRecord longzhouViewRecord)
    {
        startPage();
        List<LongzhouViewRecord> list = longzhouViewRecordService.selectLongzhouViewRecordList(longzhouViewRecord);
        return getDataTable(list);
    }

    /**
     * 导出浏览记录列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:viewRecord:export')")
    @Log(title = "浏览记录", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, LongzhouViewRecord longzhouViewRecord)
    {
        List<LongzhouViewRecord> list = longzhouViewRecordService.selectLongzhouViewRecordList(longzhouViewRecord);
        ExcelUtil<LongzhouViewRecord> util = new ExcelUtil<LongzhouViewRecord>(LongzhouViewRecord.class);
        util.exportExcel(response, list, "浏览记录数据");
    }

    /**
     * 获取浏览记录详细信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:viewRecord:query')")
    @GetMapping(value = "/{viewId}")
    public AjaxResult getInfo(@PathVariable("viewId") Long viewId)
    {
        return success(longzhouViewRecordService.selectLongzhouViewRecordByViewId(viewId));
    }

    /**
     * 新增浏览记录
     */
    @PreAuthorize("@ss.hasPermi('longzhou:viewRecord:add')")
    @Log(title = "浏览记录", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody LongzhouViewRecord longzhouViewRecord)
    {
        return toAjax(longzhouViewRecordService.insertLongzhouViewRecord(longzhouViewRecord));
    }

    /**
     * 修改浏览记录
     */
    @PreAuthorize("@ss.hasPermi('longzhou:viewRecord:edit')")
    @Log(title = "浏览记录", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody LongzhouViewRecord longzhouViewRecord)
    {
        return toAjax(longzhouViewRecordService.updateLongzhouViewRecord(longzhouViewRecord));
    }

    /**
     * 删除浏览记录
     */
    @PreAuthorize("@ss.hasPermi('longzhou:viewRecord:remove')")
    @Log(title = "浏览记录", businessType = BusinessType.DELETE)
	@DeleteMapping("/{viewIds}")
    public AjaxResult remove(@PathVariable Long[] viewIds)
    {
        return toAjax(longzhouViewRecordService.deleteLongzhouViewRecordByViewIds(viewIds));
    }
}
