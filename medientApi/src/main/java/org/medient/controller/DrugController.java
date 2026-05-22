package org.medient.controller;

import lombok.RequiredArgsConstructor;
import org.medient.dto.drug.DrugDetailResponseDTO;
import org.medient.dto.drug.DrugSearchResponseDTO;
import org.medient.service.DrugService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
@RequiredArgsConstructor
public class DrugController {

    private final DrugService drugService;

    @GetMapping("/search")
    public List<DrugSearchResponseDTO> searchDrug(@RequestParam("keyword") String keyword) {
        return drugService.searchDrugs(keyword);
    }

    @GetMapping("/{itemSeq}")
    public DrugDetailResponseDTO getDrugDetail(@PathVariable("itemSeq") String itemSeq) {
        return drugService.getDrugDetail(itemSeq);
    }
}