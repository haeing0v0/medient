package org.medient.service;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

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

	public String searchDrug(String keyword) {

		String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);

		String fullUrl = UriComponentsBuilder.fromUriString(easyDrugUrl)
				.queryParam("serviceKey", serviceKey)
				.queryParam("pageNo", 1)
				.queryParam("numOfRows", 10)
				.queryParam("type", "json")
				.queryParam("itemName", encodedKeyword)
				.build(true)
				.toUriString();

		System.out.println("URL: " + fullUrl);

		return restClient.get()
				.uri(URI.create(fullUrl))
				.retrieve()
				.body(String.class);
	}
}