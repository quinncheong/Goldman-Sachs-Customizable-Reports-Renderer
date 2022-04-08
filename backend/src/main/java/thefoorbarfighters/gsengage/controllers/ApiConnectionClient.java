package thefoorbarfighters.gsengage.controllers;

import org.springframework.scheduling.annotation.Async;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Map;

public class ApiConnectionClient {

    private Map<String, Object> mapResponse;

    private byte[] byteResponse;

    public Map<String, Object> getMapResponse() {
        return mapResponse;
    }

    public byte[] getFileResponse() {
        return byteResponse;
    }

    @Async
    public void sendPost(String url, Object rawData, boolean parseFile) {
        try {
            URI uri = new URI(url);
            RestTemplate restTemplate = new RestTemplate();
            if (parseFile) {
                byteResponse = restTemplate.postForObject(uri, rawData, byte[].class);
            } else {
                mapResponse = restTemplate.postForObject(uri, rawData, Map.class);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}