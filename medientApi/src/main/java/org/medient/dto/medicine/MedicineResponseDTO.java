package org.medient.dto.medicine;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicineResponseDTO {

    private Long id;
    private Long userId;
    private String itemSeq;
    private String itemName;
    private String startDate;
    private String endDate;
    private Integer dailyCount;
    private String doseTime;
    private String status;
    private String memo;
    private String createdAt;
}