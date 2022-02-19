package thefoorbarfighters.gsengage;

import thefoorbarfighters.gsengage.properties.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
@SpringBootApplication
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class gsengageApplication {
	public static void main(String[] args) {
		SpringApplication.run(gsengageApplication.class, args);
	}
}
