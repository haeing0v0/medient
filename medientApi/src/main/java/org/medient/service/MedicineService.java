package org.medient.service;

import java.util.ArrayList;
import java.util.List;

import org.medient.dto.dur.DurCacheDTO;
import org.medient.dto.dur.DurCheckResponseDTO;
import org.medient.dto.dur.DurWarningDTO;
import org.medient.dto.medicine.MedicineRequestDTO;
import org.medient.dto.medicine.MedicineResponseDTO;
import org.medient.mapper.DurCacheMapper;
import org.medient.mapper.MedicineMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineMapper medicineMapper;
    private final DurService durService;
    private final DurCacheMapper durCacheMapper;

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

        refreshDurCache(dto.getUserId());
    }

    public void updateMedicine(Long id, MedicineRequestDTO dto) {
        medicineMapper.updateMedicine(id, dto);

        refreshDurCache(dto.getUserId());
    }

    public void completeMedicine(Long id, Long userId) {
        medicineMapper.updateTaken(id, userId);
        medicineMapper.insertMedicineLog(id, userId);
    }

    public void deleteMedicine(Long id, Long userId) {
        medicineMapper.deleteMedicine(id, userId);

        refreshDurCache(userId);
    }

    private void refreshDurCache(Long userId) {
        durCacheMapper.deleteByUserId(userId);

        List<MedicineResponseDTO> medicines =
                medicineMapper.findActiveMedicinesForDur(userId);

        if (medicines.size() < 2) {
            return;
        }

        for (int i = 0; i < medicines.size(); i++) {
            for (int j = i + 1; j < medicines.size(); j++) {
                MedicineResponseDTO drug1 = medicines.get(i);
                MedicineResponseDTO drug2 = medicines.get(j);

                String drug1Name = drug1.getItemName();
                String drug2Name = drug2.getItemName();

                String[] sortedNames = sortDrugNames(drug1Name, drug2Name);

                DurCheckResponseDTO result1 =
                        durService.checkDur(drug1Name, drug2Name);

                DurCheckResponseDTO result2 =
                        durService.checkDur(drug2Name, drug1Name);

                List<DurWarningDTO> warnings = new ArrayList<>();
                warnings.addAll(result1.getWarnings());
                warnings.addAll(result2.getWarnings());

                for (DurWarningDTO warning : warnings) {
                    if (!warning.isDanger()) {
                        continue;
                    }

                    DurCacheDTO cache = new DurCacheDTO();
                    cache.setUserId(userId);
                    cache.setDrug1Name(sortedNames[0]);
                    cache.setDrug2Name(sortedNames[1]);
                    cache.setWarningType(warning.getType());
                    cache.setMessage(warning.getMessage());
                    cache.setDanger(true);

                    durCacheMapper.insertCache(cache);
                }
            }
        }
    }

    private String[] sortDrugNames(String drug1, String drug2) {
        if (drug1.compareTo(drug2) <= 0) {
            return new String[] { drug1, drug2 };
        }

        return new String[] { drug2, drug1 };
    }
}