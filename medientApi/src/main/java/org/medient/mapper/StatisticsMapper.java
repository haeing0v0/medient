package org.medient.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.medient.dto.medicine.MedicineResponseDTO;
import org.medient.dto.statistics.StatisticsResponseDTO;

@Mapper
public interface StatisticsMapper {

    int countWeeklyTotal(@Param("userId") Long userId);

    int countWeeklyTaken(@Param("userId") Long userId);

    int countMonthlyTotal(@Param("userId") Long userId);

    int countMonthlyTaken(@Param("userId") Long userId);

    int countTotalByDate(
            @Param("userId") Long userId,
            @Param("date") String date
    );

    int countTakenByDate(
            @Param("userId") Long userId,
            @Param("date") String date
    );

    List<MedicineResponseDTO> findActiveMedicines(@Param("userId") Long userId);
    
    List<StatisticsResponseDTO.TodayMedicineItem> findTodayMedicines(
            @Param("userId") Long userId
    );
}