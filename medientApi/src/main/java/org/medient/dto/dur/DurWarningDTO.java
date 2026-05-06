package org.medient.dto.dur;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DurWarningDTO {

    private String type;
    private String message;
    private boolean danger;
}