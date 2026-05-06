package org.medient.controller;

import lombok.RequiredArgsConstructor;
import org.medient.dto.dur.DurCheckRequestDTO;
import org.medient.dto.dur.DurCheckResponseDTO;
import org.medient.service.DurService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dur")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DurController {

    private final DurService durService;

    @PostMapping("/check")
    public DurCheckResponseDTO check(
            @RequestBody DurCheckRequestDTO request
    ) {

        return durService.checkDur(
                request.getDrug1(),
                request.getDrug2()
        );
    }
}