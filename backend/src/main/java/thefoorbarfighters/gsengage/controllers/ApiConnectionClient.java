package thefoorbarfighters.gsengage.controllers;

import net.minidev.json.JSONObject;
import org.springframework.web.client.RestTemplate;
import java.net.URI;

public class ApiConnectionClient {

    public static JSONObject sendGet(String url) throws Exception {
        URI uri = new URI(url);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, JSONObject.class);
    }

    public static JSONObject sendPost(String url, JSONObject rawData) throws Exception {
        URI uri = new URI(url);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject(uri, rawData, JSONObject.class);
    }
}
