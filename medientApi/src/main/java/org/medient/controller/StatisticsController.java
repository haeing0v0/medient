package org.medient.controller;

import org.medient.config.JwtUtil;
import org.medient.dto.statistics.StatisticsResponseDTO;
import org.medient.service.StatisticsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;
    private final JwtUtil jwtUtil;

    private Long getUserNoFromToken(String authorizationHeader) {

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {
            throw new StatisticsAuthException("Authorization 토큰이 없습니다.");
        }

        String token = authorizationHeader.replace("Bearer ", "");

        if (!jwtUtil.isValidToken(token)) {
            throw new StatisticsAuthException("유효하지 않은 토큰입니다.");
        }

        return jwtUtil.getUserNo(token);
    }

    @GetMapping
    public StatisticsResponseDTO getStatistics(
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        return statisticsService.getStatistics(userNo);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    private static class StatisticsAuthException extends RuntimeException {
        public StatisticsAuthException(String message) {
            super(message);
        }
    }
}