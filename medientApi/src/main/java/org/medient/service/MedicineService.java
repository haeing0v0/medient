package org.medient.service;

import java.util.List;

import org.medient.dto.medicine.MedicineRequestDTO;
import org.medient.dto.medicine.MedicineResponseDTO;
import org.medient.mapper.MedicineMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineMapper medicineMapper;

    public List<MedicineResponseDTO> getMedicines(Long userId) {
        return medicineMapper.findByUserId(userId);
    }

    public List<MedicineResponseDTO> getTodayMedicines(Long userId) {
        return medicineMapper.findTodayByUserId(userId);
    }

    public MedicineResponseDTO getMedicine(Long id, Long userId) {
        return medicineMapper.findById(id, userId);
    }

    public void addMedicine(MedicineRequestDTO dto) {
        if (dto.getStatus() == null || dto.getStatus().isBlank()) {
            dto.setStatus("복용중");
        }

        medicineMapper.insertMedicine(dto);
    }

    public void updateMedicine(Long id, MedicineRequestDTO dto) {
        medicineMapper.updateMedicine(id, dto);
    }

    public void completeMedicine(Long id, Long userId) {
        medicineMapper.updateTaken(id, userId);
    }

    public void deleteMedicine(Long id, Long userId) {
        medicineMapper.deleteMedicine(id, userId);
    }
}