package org.medient.dto.dur;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DurCheckResponseDTO {

    private boolean hasDanger;
    private List<DurWarningDTO> warnings;
}