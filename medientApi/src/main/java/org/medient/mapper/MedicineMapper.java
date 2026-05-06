package org.medient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.medient.dto.medicine.MedicineRequestDTO;
import org.medient.dto.medicine.MedicineResponseDTO;

@Mapper
public interface MedicineMapper {

    List<MedicineResponseDTO> findByUserId(Long userId);

    List<MedicineResponseDTO> findTodayByUserId(Long userId);

    MedicineResponseDTO findById(@Param("id") Long id, @Param("userId") Long userId);

    void insertMedicine(MedicineRequestDTO dto);

    void updateMedicine(@Param("id") Long id, @Param("dto") MedicineRequestDTO dto);

    void updateTaken(@Param("id") Long id, @Param("userId") Long userId);

    void deleteMedicine(@Param("id") Long id, @Param("userId") Long userId);
}