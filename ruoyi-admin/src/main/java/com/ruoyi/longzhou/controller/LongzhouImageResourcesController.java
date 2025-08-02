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
import com.ruoyi.longzhou.domain.LongzhouImageResources;
import com.ruoyi.longzhou.service.ILongzhouImageResourcesService;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.common.core.page.TableDataInfo;

/**
 * 龙舟活动图片资源Controller
 * 
 * @author ruoyi
 * @date 2025-08-01
 */
@RestController
@RequestMapping("/longzhou/imageResources")
public class LongzhouImageResourcesController extends BaseController
{
    @Autowired
    private ILongzhouImageResourcesService longzhouImageResourcesService;

    /**
     * 查询龙舟活动图片资源列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:imageResources:list')")
    @GetMapping("/list")
    public TableDataInfo list(LongzhouImageResources longzhouImageResources)
    {
        startPage();
        List<LongzhouImageResources> list = longzhouImageResourcesService.selectLongzhouImageResourcesList(longzhouImageResources);
        return getDataTable(list);
    }

    /**
     * 导出龙舟活动图片资源列表
     */
    @PreAuthorize("@ss.hasPermi('longzhou:imageResources:export')")
    @Log(title = "龙舟活动图片资源", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, LongzhouImageResources longzhouImageResources)
    {
        List<LongzhouImageResources> list = longzhouImageResourcesService.selectLongzhouImageResourcesList(longzhouImageResources);
        ExcelUtil<LongzhouImageResources> util = new ExcelUtil<LongzhouImageResources>(LongzhouImageResources.class);
        util.exportExcel(response, list, "龙舟活动图片资源数据");
    }

    /**
     * 获取龙舟活动图片资源详细信息
     */
    @PreAuthorize("@ss.hasPermi('longzhou:imageResources:query')")
    @GetMapping(value = "/{resourceId}")
    public AjaxResult getInfo(@PathVariable("resourceId") Long resourceId)
    {
        return success(longzhouImageResourcesService.selectLongzhouImageResourcesByResourceId(resourceId));
    }

    /**
     * 根据资源键值获取图片资源
     */
    @GetMapping("/key/{resourceKey}")
    public AjaxResult getByResourceKey(@PathVariable("resourceKey") String resourceKey)
    {
        try {
            LongzhouImageResources queryParam = new LongzhouImageResources();
            queryParam.setResourceKey(resourceKey);
            queryParam.setStatus("0"); // 只查询正常状态的资源
            List<LongzhouImageResources> list = longzhouImageResourcesService.selectLongzhouImageResourcesList(queryParam);
            if (list != null && !list.isEmpty()) {
                return success(list.get(0));
            }
            return error("图片资源不存在: " + resourceKey);
        } catch (Exception e) {
            return error("获取图片资源失败: " + e.getMessage());
        }
    }

    /**
     * 根据分类获取图片资源列表
     */
    @GetMapping("/category/{category}")
    public TableDataInfo getByCategory(@PathVariable("category") String category)
    {
        try {
            LongzhouImageResources queryParam = new LongzhouImageResources();
            queryParam.setCategory(category);
            queryParam.setStatus("0"); // 只查询正常状态的资源
            startPage();
            List<LongzhouImageResources> list = longzhouImageResourcesService.selectLongzhouImageResourcesList(queryParam);
            return getDataTable(list);
        } catch (Exception e) {
            return getDataTable(new java.util.ArrayList<>());
        }
    }

    /**
     * 新增龙舟活动图片资源
     */
    @PreAuthorize("@ss.hasPermi('longzhou:imageResources:add')")
    @Log(title = "龙舟活动图片资源", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody LongzhouImageResources longzhouImageResources)
    {
        return toAjax(longzhouImageResourcesService.insertLongzhouImageResources(longzhouImageResources));
    }

    /**
     * 修改龙舟活动图片资源
     */
    @PreAuthorize("@ss.hasPermi('longzhou:imageResources:edit')")
    @Log(title = "龙舟活动图片资源", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody LongzhouImageResources longzhouImageResources)
    {
        return toAjax(longzhouImageResourcesService.updateLongzhouImageResources(longzhouImageResources));
    }

    /**
     * 删除龙舟活动图片资源
     */
    @PreAuthorize("@ss.hasPermi('longzhou:imageResources:remove')")
    @Log(title = "龙舟活动图片资源", businessType = BusinessType.DELETE)
	@DeleteMapping("/{resourceIds}")
    public AjaxResult remove(@PathVariable Long[] resourceIds)
    {
        return toAjax(longzhouImageResourcesService.deleteLongzhouImageResourcesByResourceIds(resourceIds));
    }
}
