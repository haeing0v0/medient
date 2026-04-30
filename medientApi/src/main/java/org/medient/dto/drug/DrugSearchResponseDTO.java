package org.medient.dto.drug;

import lombok.Data;

@Data
public class DrugSearchResponseDTO {
    private String entpName;             // 업체명
    private String itemName;             // 제품명
    private String itemSeq;              // 품목기준코드
    private String efcyQesitm;           // 효능
    private String useMethodQesitm;      // 사용법
    private String atpnWarnQesitm;       // 주의사항 경고
    private String atpnQesitm;           // 주의사항
    private String intrcQesitm;          // 상호작용
    private String seQesitm;             // 부작용
    private String depositMethodQesitm;  // 보관법
    private String itemImage;            // 낱알이미지
    private String openDe;               // 공개일자
    private String updateDe;             // 수정일자
}