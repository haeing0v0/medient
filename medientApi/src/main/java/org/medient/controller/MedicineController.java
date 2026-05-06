package org.medient.controller;

import java.util.List;

import org.medient.dto.medicine.MedicineRequestDTO;
import org.medient.dto.medicine.MedicineResponseDTO;
import org.medient.service.MedicineService;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/medicines")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping
    public List<MedicineResponseDTO> getMedicines(
            @RequestParam("userId") Long userId
    ) {
        return medicineService.getMedicines(userId);
    }

    @GetMapping("/today")
    public List<MedicineResponseDTO> getTodayMedicines(
            @RequestParam("userId") Long userId
    ) {
        return medicineService.getTodayMedicines(userId);
    }

    @GetMapping("/{id}")
    public MedicineResponseDTO getMedicine(
            @PathVariable("id") Long id,
            @RequestParam("userId") Long userId
    ) {
        return medicineService.getMedicine(id, userId);
    }

    @PostMapping
    public String addMedicine(@RequestBody MedicineRequestDTO dto) {
        medicineService.addMedicine(dto);
        return "복용약 등록 완료";
    }

    @PutMapping("/{id}")
    public String updateMedicine(
            @PathVariable("id") Long id,
            @RequestBody MedicineRequestDTO dto
    ) {
        medicineService.updateMedicine(id, dto);
        return "복용약 수정 완료";
    }

    @PutMapping("/{id}/taken")
    public String completeMedicine(
            @PathVariable("id") Long id,
            @RequestParam("userId") Long userId
    ) {
        medicineService.completeMedicine(id, userId);
        return "복용 완료 처리";
    }

    @DeleteMapping("/{id}")
    public String deleteMedicine(
            @PathVariable("id") Long id,
            @RequestParam("userId") Long userId
    ) {
        medicineService.deleteMedicine(id, userId);
        return "복용약 삭제 완료";
    }
}