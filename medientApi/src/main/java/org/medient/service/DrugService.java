package org.medient.service;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.medient.dto.drug.DrugApiResponseDTO;
import org.medient.dto.drug.DrugDetailResponseDTO;
import org.medient.dto.drug.DrugSearchResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class DrugService {

    private final RestClient restClient = RestClient.create();

    @Value("${openapi.service-key}")
    private String serviceKey;

    @Value("${openapi.easy-drug-url}")
    private String easyDrugUrl;

    // 약 검색 목록 조회
    public List<DrugSearchResponseDTO> searchDrugs(String keyword) {

        DrugApiResponseDTO response = callDrugApi("itemName", keyword);

        if (response == null ||
                response.getBody() == null ||
                response.getBody().getItems() == null) {
            return List.of();
        }

        return response.getBody().getItems()
                .stream()
                .map(item -> {
                    DrugSearchResponseDTO dto = new DrugSearchResponseDTO();

                    dto.setItemImage(item.getItemImage());
                    dto.setItemName(item.getItemName());
                    dto.setEntpName(item.getEntpName());
                    dto.setEfcyQesitm(item.getEfcyQesitm());
                    dto.setUseMethodQesitm(item.getUseMethodQesitm());
                    dto.setItemSeq(item.getItemSeq());

                    return dto;
                })
                .toList();
    }

    // 약 상세 조회
    public DrugDetailResponseDTO getDrugDetail(String itemSeq) {

        DrugApiResponseDTO response = callDrugApi("itemSeq", itemSeq);

        if (response == null ||
                response.getBody() == null ||
                response.getBody().getItems() == null ||
                response.getBody().getItems().isEmpty()) {
            throw new IllegalArgumentException("해당 의약품 정보를 찾을 수 없습니다.");
        }

        var item = response.getBody().getItems().get(0);

        DrugDetailResponseDTO dto = new DrugDetailResponseDTO();

        dto.setItemImage(item.getItemImage());
        dto.setItemName(item.getItemName());
        dto.setEntpName(item.getEntpName());

        dto.setEfcyQesitm(item.getEfcyQesitm());
        dto.setUseMethodQesitm(item.getUseMethodQesitm());
        dto.setAtpnQesitm(item.getAtpnQesitm());
        dto.setIntrcQesitm(item.getIntrcQesitm());
        dto.setSeQesitm(item.getSeQesitm());
        dto.setDepositMethodQesitm(item.getDepositMethodQesitm());

        dto.setItemSeq(item.getItemSeq());

        return dto;
    }

    // 공공데이터 API 호출 공통 메서드
    private DrugApiResponseDTO callDrugApi(String paramName, String paramValue) {

        String encodedValue = URLEncoder.encode(paramValue, StandardCharsets.UTF_8);

        String fullUrl = UriComponentsBuilder.fromUriString(easyDrugUrl)
                .queryParam("serviceKey", serviceKey)
                .queryParam("pageNo", 1)
                .queryParam("numOfRows", 10)
                .queryParam("type", "json")
                .queryParam(paramName, encodedValue)
                .build(true)
                .toUriString();

        System.out.println("URL: " + fullUrl);

        return restClient.get()
                .uri(URI.create(fullUrl))
                .retrieve()
                .body(DrugApiResponseDTO.class);
    }
}