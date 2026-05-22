package org.medient.controller;

import java.util.List;

import org.medient.config.JwtUtil;
import org.medient.dto.dur.DurCacheDTO;
import org.medient.dto.medicine.MedicineRequestDTO;
import org.medient.dto.medicine.MedicineResponseDTO;
import org.medient.service.MedicineService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
public class MedicineController {

    private final MedicineService medicineService;
    private final JwtUtil jwtUtil;

    private Long getUserNoFromToken(String authorizationHeader) {

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {
            throw new MedicineAuthException("Authorization 토큰이 없습니다.");
        }

        String token = authorizationHeader.replace("Bearer ", "");

        if (!jwtUtil.isValidToken(token)) {
            throw new MedicineAuthException("유효하지 않은 토큰입니다.");
        }

        return jwtUtil.getUserNo(token);
    }

    @GetMapping
    public List<MedicineResponseDTO> getMedicines(
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        return medicineService.getMedicines(userNo);
    }

    @GetMapping("/today")
    public List<MedicineResponseDTO> getTodayMedicines(
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        return medicineService.getTodayMedicines(userNo);
    }

    @GetMapping("/{id}")
    public MedicineResponseDTO getMedicine(
            @PathVariable("id") Long id,
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        return medicineService.getMedicine(id, userNo);
    }

    @PostMapping
    public String addMedicine(
            @RequestBody MedicineRequestDTO dto,
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        dto.setUserId(userNo);

        medicineService.addMedicine(dto);

        return "복용약 등록 완료";
    }

    @PutMapping("/{id}")
    public String updateMedicine(
            @PathVariable("id") Long id,
            @RequestBody MedicineRequestDTO dto,
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        dto.setUserId(userNo);

        medicineService.updateMedicine(id, dto);

        return "복용약 수정 완료";
    }

    @PutMapping("/{id}/taken")
    public String completeMedicine(
            @PathVariable("id") Long id,
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        medicineService.completeMedicine(id, userNo);

        return "복용 완료 처리";
    }

    @DeleteMapping("/{id}")
    public String deleteMedicine(
            @PathVariable("id") Long id,
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        medicineService.deleteMedicine(id, userNo);

        return "복용약 삭제 완료";
    }
    
    @GetMapping("/dur-warnings")
    public List<DurCacheDTO> getDurWarnings(
            @RequestHeader(value = "Authorization", required = false)
            String authorizationHeader
    ) {
        Long userNo = getUserNoFromToken(authorizationHeader);

        return medicineService.getDurWarnings(userNo);
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    private static class MedicineAuthException extends RuntimeException {
        public MedicineAuthException(String message) {
            super(message);
        }
    }
}