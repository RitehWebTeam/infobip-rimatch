package com.rimatch.rimatchbackend.configuration;

import com.rimatch.rimatchbackend.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.Collections;

@Configuration
@EnableMongoAuditing
public class AppConfiguration {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    FilterRegistrationBean<JwtAuthenticationFilter> registrationBean(){
        final FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(jwtAuthenticationFilter);
        registrationBean.setUrlPatterns(Collections.singletonList("/users/*"));

        return registrationBean;

    }

}
