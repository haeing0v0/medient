package org.medient.dto.drug;

import lombok.Data;

@Data
public class DrugDetailResponseDTO {

    private String itemImage;        // 약 이미지
    private String itemName;         // 제품명
    private String entpName;         // 업체명
    private String efcyQesitm;       // 효능
    private String useMethodQesitm;  // 사용법
    private String atpnQesitm;       // 주의사항
    private String intrcQesitm;      // 상호작용
    private String seQesitm;             // 부작용
    private String depositMethodQesitm; // 보관법
    private String itemSeq;          // 품목기준코드
}