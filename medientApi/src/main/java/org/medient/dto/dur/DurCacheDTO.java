package org.medient.dto.dur;

import lombok.Data;

@Data
public class DurCacheDTO {

    private Long id;
    private Long userId;

    private String drug1Name;
    private String drug2Name;

    private String warningType;
    private String message;
    private Boolean danger;

    private String createdAt;
    private String updatedAt;
}