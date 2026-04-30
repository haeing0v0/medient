package org.medient.controller;

import lombok.RequiredArgsConstructor;
import org.medient.service.DrugService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/drugs")
@RequiredArgsConstructor
public class DrugController {

	private final DrugService drugService;

	@GetMapping("/search")
	public String searchDrug(@RequestParam("keyword") String keyword) {
		return drugService.searchDrug(keyword);
	}
}