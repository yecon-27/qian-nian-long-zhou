package com.ruoyi.system.domain.dto;

import javax.validation.constraints.NotNull;

/**
 * 投票请求DTO
 * 
 * @author ruoyi
 * @date 2025-01-25
 */
public class VoteRequestDTO
{
    /** 队伍ID */
    @NotNull(message = "队伍ID不能为空")
    private Long teamId;

    public VoteRequestDTO() {
    }

    public VoteRequestDTO(Long teamId) {
        this.teamId = teamId;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
}