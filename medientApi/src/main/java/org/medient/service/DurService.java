package org.medient.service;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.medient.dto.dur.DurCheckResponseDTO;
import org.medient.dto.dur.DurWarningDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DurService {

    @Value("${openapi.dur-key}")
    private String serviceKey;

    @Value("${openapi.dur-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public DurCheckResponseDTO checkDur(String drug1, String drug2) {

        List<DurWarningDTO> warnings = new ArrayList<>();

        checkUsjntTaboo(drug1, drug2, warnings);
        checkEfcyDuplicate(drug1, drug2, warnings);
        checkCapacityWarning(drug1, drug2, warnings);
        checkPeriodWarning(drug1, drug2, warnings);
        checkSplitWarning(drug1, drug2, warnings);

        boolean hasDanger =
                warnings.stream().anyMatch(DurWarningDTO::isDanger);

        return DurCheckResponseDTO.builder()
                .hasDanger(hasDanger)
                .warnings(warnings)
                .build();
    }

    private void checkUsjntTaboo(
            String drug1,
            String drug2,
            List<DurWarningDTO> warnings
    ) {
        JSONArray items = requestDurApi("/getUsjntTabooInfoList03", drug1);

        boolean found = false;
        String message = "병용금기 해당 없음";

        for (int i = 0; i < items.length(); i++) {
            JSONObject item = items.getJSONObject(i);

            String mixtureItemName = item.optString("MIXTURE_ITEM_NAME");
            String mixtureIngrName = item.optString("MIXTURE_INGR_KOR_NAME");
            String prohbtContent = item.optString("PROHBT_CONTENT");

            if (containsText(mixtureItemName, drug2)
                    || containsText(mixtureIngrName, drug2)
                    || containsText(drug2, mixtureIngrName)) {

                found = true;
                message = "두 약물 조합은 병용금기입니다.";

                if (!prohbtContent.isBlank()) {
                    message += " 사유: " + prohbtContent;
                }

                break;
            }
        }

        addWarning(warnings, "병용금기", message, found);
    }

    private void checkEfcyDuplicate(
            String drug1,
            String drug2,
            List<DurWarningDTO> warnings
    ) {
        JSONArray items = requestDurApi("/getEfcyDplctInfoList03", drug1);

        boolean found = false;
        String message = "효능군중복 해당 없음";

        for (int i = 0; i < items.length(); i++) {
            JSONObject item = items.getJSONObject(i);

            String mixtureItemName = item.optString("MIXTURE_ITEM_NAME");
            String mixtureIngrName = item.optString("MIXTURE_INGR_KOR_NAME");
            String durType = item.optString("TYPE_NAME");

            if (containsText(mixtureItemName, drug2)
                    || containsText(mixtureIngrName, drug2)
                    || containsText(drug2, mixtureIngrName)) {

                found = true;
                message = "두 약물은 효능군이 중복될 수 있습니다.";

                if (!durType.isBlank()) {
                    message += " 유형: " + durType;
                }

                break;
            }
        }

        addWarning(warnings, "효능군중복", message, found);
    }

    private void checkCapacityWarning(
            String drug1,
            String drug2,
            List<DurWarningDTO> warnings
    ) {
        List<String> messages = new ArrayList<>();

        JSONArray items1 = requestDurApi("/getCpctyAtentInfoList03", drug1);
        JSONArray items2 = requestDurApi("/getCpctyAtentInfoList03", drug2);

        addSingleDrugWarningMessage(messages, items1, drug1, "용량주의");
        addSingleDrugWarningMessage(messages, items2, drug2, "용량주의");

        if (messages.isEmpty()) {
            addWarning(warnings, "용량주의", "용량주의 해당 없음", false);
        } else {
            addWarning(warnings, "용량주의", String.join(" / ", messages), false);
        }
    }

    private void checkPeriodWarning(
            String drug1,
            String drug2,
            List<DurWarningDTO> warnings
    ) {
        List<String> messages = new ArrayList<>();

        JSONArray items1 = requestDurApi("/getMdctnPdAtentInfoList03", drug1);
        JSONArray items2 = requestDurApi("/getMdctnPdAtentInfoList03", drug2);

        addSingleDrugWarningMessage(messages, items1, drug1, "투여기간주의");
        addSingleDrugWarningMessage(messages, items2, drug2, "투여기간주의");

        if (messages.isEmpty()) {
            addWarning(warnings, "투여기간주의", "투여기간주의 해당 없음", false);
        } else {
            addWarning(warnings, "투여기간주의", String.join(" / ", messages), false);
        }
    }

    private void checkSplitWarning(
            String drug1,
            String drug2,
            List<DurWarningDTO> warnings
    ) {
        List<String> messages = new ArrayList<>();

        JSONArray items1 = requestDurApi(
                "/getSeobangjeongPartitnAtentInfoList03",
                drug1
        );
        JSONArray items2 = requestDurApi(
                "/getSeobangjeongPartitnAtentInfoList03",
                drug2
        );

        addSingleDrugWarningMessage(messages, items1, drug1, "서방정분할주의");
        addSingleDrugWarningMessage(messages, items2, drug2, "서방정분할주의");

        if (messages.isEmpty()) {
            addWarning(warnings, "서방정분할주의", "서방정분할주의 해당 없음", false);
        } else {
            addWarning(warnings, "서방정분할주의", String.join(" / ", messages), true);
        }
    }

    private void addSingleDrugWarningMessage(
            List<String> messages,
            JSONArray items,
            String drugName,
            String type
    ) {
        if (items.length() == 0) {
            return;
        }

        JSONObject item = items.getJSONObject(0);

        String itemName = item.optString("ITEM_NAME", drugName);
        String prohbtContent = item.optString("PROHBT_CONTENT");
        String remark = item.optString("REMARK");

        String message = itemName + " " + type + " 정보 있음";

        if (!prohbtContent.isBlank()) {
            message += " - " + prohbtContent;
        } else if (!remark.isBlank()) {
            message += " - " + remark;
        }

        messages.add(message);
    }

    private JSONArray requestDurApi(String path, String itemName) {

        try {
            String encodedItemName =
                    URLEncoder.encode(itemName, StandardCharsets.UTF_8);

            String url =
                    baseUrl +
                    path +
                    "?serviceKey=" + serviceKey +
                    "&pageNo=1" +
                    "&numOfRows=100" +
                    "&type=json" +
                    "&itemName=" + encodedItemName;

            URI uri = URI.create(url);

            String response = restTemplate.getForObject(uri, String.class);

            JSONObject json = new JSONObject(response);

            return extractItems(json);

        } catch (Exception e) {
            e.printStackTrace();
            return new JSONArray();
        }
    }

    private JSONArray extractItems(JSONObject json) {

        if (!json.has("body")) {
            return new JSONArray();
        }

        JSONObject body = json.optJSONObject("body");

        if (body == null || !body.has("items")) {
            return new JSONArray();
        }

        Object itemsObj = body.get("items");

        if (itemsObj instanceof JSONArray) {
            return (JSONArray) itemsObj;
        }

        if (itemsObj instanceof JSONObject) {
            JSONObject itemsJson = (JSONObject) itemsObj;

            if (itemsJson.has("item")) {
                Object itemObj = itemsJson.get("item");

                if (itemObj instanceof JSONArray) {
                    return (JSONArray) itemObj;
                }

                if (itemObj instanceof JSONObject) {
                    JSONArray arr = new JSONArray();
                    arr.put(itemObj);
                    return arr;
                }
            }

            JSONArray arr = new JSONArray();
            arr.put(itemsJson);
            return arr;
        }

        return new JSONArray();
    }

    private void addWarning(
            List<DurWarningDTO> warnings,
            String type,
            String message,
            boolean danger
    ) {
        warnings.add(
                DurWarningDTO.builder()
                        .type(type)
                        .message(message)
                        .danger(danger)
                        .build()
        );
    }

    private boolean containsText(String target, String keyword) {
        if (target == null || keyword == null) {
            return false;
        }

        return target.replace(" ", "")
                .toLowerCase()
                .contains(
                        keyword.replace(" ", "")
                                .toLowerCase()
                );
    }
}