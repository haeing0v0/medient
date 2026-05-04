package org.medient.dto.drug;

import lombok.Data;
import java.util.List;

@Data
public class DrugApiResponseDTO {

    private Header header;
    private Body body;

    @Data
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Data
    public static class Body {
        private int pageNo;
        private int totalCount;
        private int numOfRows;
        private List<DrugApiItemDTO> items;
    }
}