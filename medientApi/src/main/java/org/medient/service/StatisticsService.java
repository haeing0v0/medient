package org.medient.service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.medient.dto.dur.DurCheckResponseDTO;
import org.medient.dto.dur.DurWarningDTO;
import org.medient.dto.medicine.MedicineResponseDTO;
import org.medient.dto.statistics.StatisticsResponseDTO;
import org.medient.mapper.StatisticsMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsMapper statisticsMapper;
    private final DurService durService;

    public StatisticsResponseDTO getStatistics(Long userId) {

    	List<StatisticsResponseDTO.RateItem> weeklyGraph =
    	        createWeeklyGraph(userId);

    	List<StatisticsResponseDTO.RateItem> monthlyGraph =
    	        createMonthlyGraph(userId);

    	int weeklyRate = calculateAverageRate(weeklyGraph);
    	int monthlyRate = calculateAverageRate(monthlyGraph);

        List<StatisticsResponseDTO.CalendarItem> calendarItems =
                createCalendarItems(userId);

        int streakDays = calculateStreakDays(userId);

        List<StatisticsResponseDTO.DangerItem> dangerItems =
                createDangerItems(userId);

        String feedback =
                createFeedback(weeklyRate, streakDays, dangerItems.size());

        List<StatisticsResponseDTO.TodayMedicineItem> todayMedicines =
                statisticsMapper.findTodayMedicines(userId);

        return StatisticsResponseDTO.builder()
                .weeklyRate(weeklyRate)
                .monthlyRate(monthlyRate)
                .streakDays(streakDays)
                .dangerCount(dangerItems.size())
                .weeklyGraph(weeklyGraph)
                .monthlyGraph(monthlyGraph)
                .dangerItems(dangerItems)
                .calendarItems(calendarItems)
                .todayMedicines(todayMedicines)
                .feedback(feedback)
                .build();
    }

    private int calculateRate(int taken, int total) {
        if (total == 0) {
            return 0;
        }

        return (int) Math.round((taken * 100.0) / total);
    }
    
    private int calculateAverageRate(List<StatisticsResponseDTO.RateItem> graph) {
        int sum = 0;
        int count = 0;

        for (StatisticsResponseDTO.RateItem item : graph) {
            if (item.getRate() != -1) {
                sum += item.getRate();
                count++;
            }
        }

        if (count == 0) {
            return 0;
        }

        return (int) Math.round(sum * 1.0 / count);
    }

    private List<StatisticsResponseDTO.RateItem> createWeeklyGraph(Long userId) {
        List<StatisticsResponseDTO.RateItem> list = new ArrayList<>();

        LocalDate today = LocalDate.now();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);

            int total = statisticsMapper.countTotalByDate(userId, date.toString());
            int taken = statisticsMapper.countTakenByDate(userId, date.toString());
            int rate = total == 0 ? -1 : calculateRate(taken, total);

            String label = date.getDayOfWeek()
                    .getDisplayName(TextStyle.SHORT, Locale.KOREAN);

            list.add(
                    StatisticsResponseDTO.RateItem.builder()
                            .label(label)
                            .rate(rate)
                            .build()
            );
            
            System.out.println(date);
            System.out.println("전체 약: " + total);
            System.out.println("복용 약: " + taken);
            System.out.println("복용률: " + rate);
        }

        return list;
    }

    private List<StatisticsResponseDTO.RateItem> createMonthlyGraph(Long userId) {
        List<StatisticsResponseDTO.RateItem> list = new ArrayList<>();

        LocalDate today = LocalDate.now();

        for (int week = 3; week >= 0; week--) {
            LocalDate start = today.minusDays((week * 7L) + 6);
            LocalDate end = today.minusDays(week * 7L);

            int total = 0;
            int taken = 0;

            LocalDate current = start;

            while (!current.isAfter(end)) {
                total += statisticsMapper.countTotalByDate(userId, current.toString());
                taken += statisticsMapper.countTakenByDate(userId, current.toString());
                current = current.plusDays(1);
            }

            int rate = total == 0 ? -1 : calculateRate(taken, total);

            list.add(
                    StatisticsResponseDTO.RateItem.builder()
                            .label((4 - week) + "주차")
                            .rate(rate)
                            .build()
            );
        }

        return list;
    }

    private List<StatisticsResponseDTO.CalendarItem> createCalendarItems(Long userId) {
        List<StatisticsResponseDTO.CalendarItem> list = new ArrayList<>();

        LocalDate today = LocalDate.now();

        for (int i = 13; i >= 0; i--) {
            LocalDate date = today.minusDays(i);

            int total = statisticsMapper.countTotalByDate(userId, date.toString());
            int taken = statisticsMapper.countTakenByDate(userId, date.toString());

            boolean isTaken = total > 0 && taken >= total;

            list.add(
                    StatisticsResponseDTO.CalendarItem.builder()
                            .date(date.toString())
                            .taken(isTaken)
                            .build()
            );
        }

        return list;
    }

    private int calculateStreakDays(Long userId) {
        int streak = 0;

        LocalDate date = LocalDate.now();

        for (int i = 0; i < 30; i++) {
            int total = statisticsMapper.countTotalByDate(userId, date.toString());
            int taken = statisticsMapper.countTakenByDate(userId, date.toString());

            if (total > 0 && taken >= total) {
                streak++;
                date = date.minusDays(1);
            } else {
                break;
            }
        }

        return streak;
    }

    private List<StatisticsResponseDTO.DangerItem> createDangerItems(Long userId) {
        List<StatisticsResponseDTO.DangerItem> dangerItems = new ArrayList<>();
        List<String> addedKeys = new ArrayList<>();

        List<MedicineResponseDTO> activeMedicines =
                statisticsMapper.findActiveMedicines(userId);

        for (int i = 0; i < activeMedicines.size(); i++) {
            for (int j = i + 1; j < activeMedicines.size(); j++) {

                MedicineResponseDTO drug1 = activeMedicines.get(i);
                MedicineResponseDTO drug2 = activeMedicines.get(j);

                DurCheckResponseDTO result1 =
                        durService.checkDur(drug1.getItemName(), drug2.getItemName());

                DurCheckResponseDTO result2 =
                        durService.checkDur(drug2.getItemName(), drug1.getItemName());

                List<DurWarningDTO> warnings = new ArrayList<>();
                warnings.addAll(result1.getWarnings());
                warnings.addAll(result2.getWarnings());

                for (DurWarningDTO warning : warnings) {
                    if (warning.isDanger()) {

                        String key =
                                drug1.getItemName()
                                        + "|"
                                        + drug2.getItemName()
                                        + "|"
                                        + warning.getType()
                                        + "|"
                                        + warning.getMessage();

                        if (addedKeys.contains(key)) {
                            continue;
                        }

                        addedKeys.add(key);

                        dangerItems.add(
                                StatisticsResponseDTO.DangerItem.builder()
                                        .drug1(drug1.getItemName())
                                        .drug2(drug2.getItemName())
                                        .type(warning.getType())
                                        .message(warning.getMessage())
                                        .build()
                        );
                    }
                }
            }
        }

        return dangerItems;
    }

    private String createFeedback(
            int weeklyRate,
            int streakDays,
            int dangerCount
    ) {
        if (dangerCount > 0) {
            return "현재 복용 중인 약 조합에서 주의가 필요한 항목이 있습니다. 안전체크 결과를 확인해보세요.";
        }

        if (streakDays >= 7) {
            return "7일 이상 연속 복용을 잘 지키고 있어요. 좋은 복약 습관을 유지 중입니다.";
        }

        if (weeklyRate >= 80) {
            return "이번 주 복용률이 좋아요. 지금처럼 꾸준히 복용해보세요.";
        }

        if (weeklyRate >= 50) {
            return "이번 주 복용률이 조금 낮아졌어요. 복용 시간을 다시 확인해보세요.";
        }

        return "최근 복용 기록이 부족합니다. 오늘 복용약부터 차근차근 기록해보세요.";
    }
}