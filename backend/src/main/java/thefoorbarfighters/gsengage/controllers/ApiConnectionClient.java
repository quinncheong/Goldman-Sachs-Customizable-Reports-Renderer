package thefoorbarfighters.gsengage.controllers;

import org.json.JSONObject;
import org.springframework.web.client.RestTemplate;
import java.net.URI;

public class ApiConnectionClient {

    private JSONObject response;

    public JSONObject getResponse() {
        return response;
    }

    public void sendGet(String url) throws Exception {
        URI uri = new URI(url);
        RestTemplate restTemplate = new RestTemplate();
        this.response = restTemplate.getForObject(uri, JSONObject.class);
    }

    public void sendPost(String url, JSONObject rawData) throws Exception {
        URI uri = new URI(url);
        RestTemplate restTemplate = new RestTemplate();
        this.response = restTemplate.postForObject(uri, rawData, JSONObject.class);
    }
}