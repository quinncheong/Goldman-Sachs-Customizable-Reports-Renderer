package thefoorbarfighters.gsengage.controllers;

import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.util.Map;

public class ApiConnectionClient {

    private Map<String, Object> response;

    public Map<String, Object> getResponse() {
        return response;
    }

    public void sendGet(String url) throws Exception {
        URI uri = new URI(url);
        RestTemplate restTemplate = new RestTemplate();
        response = restTemplate.getForObject(uri, Map.class);
    }

    public void sendPost(String url, Object rawData) throws Exception {
        URI uri = new URI(url);
        RestTemplate restTemplate = new RestTemplate();
        response = restTemplate.postForObject(uri, rawData, Map.class);
    }
}