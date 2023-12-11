package com.rimatch.rimatchbackend.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI api(){
        return new OpenAPI().info(new Info().title("Rimatch API")
                .description("Rimatch daing application")
                .version("v0.0.1")
                .license(new License().name("Apache 2.0").url("http://springdoc.org"))
        );
    }

}
