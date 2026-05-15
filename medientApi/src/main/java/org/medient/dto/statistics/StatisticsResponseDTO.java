package org.medient.dto.statistics;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StatisticsResponseDTO {

    private int weeklyRate;
    private int monthlyRate;
    private int streakDays;
    private int dangerCount;
    private int todayTakenCount;

    private List<RateItem> weeklyGraph;
    private List<RateItem> monthlyGraph;
    private List<DangerItem> dangerItems;
    private List<CalendarItem> calendarItems;
    private List<TodayMedicineItem> todayMedicines;
    private String feedback;

    @Getter
    @Builder
    public static class RateItem {
        private String label;
        private int rate;
    }

    @Getter
    @Builder
    public static class DangerItem {
        private String drug1;
        private String drug2;
        private String type;
        private String message;
    }

    @Getter
    @Builder
    public static class CalendarItem {
        private String date;
        private boolean taken;
    }
    
    @Getter
    @Builder
    public static class TodayMedicineItem {
        private Long medicineId;
        private String time;
        private String itemName;
        private String status;
    }
}