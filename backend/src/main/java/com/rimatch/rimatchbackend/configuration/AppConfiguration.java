package com.rimatch.rimatchbackend.configuration;

import com.rimatch.rimatchbackend.filter.CorsFilter;
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

    @Autowired
    private CorsFilter corsFilter;

    @Bean
    FilterRegistrationBean<JwtAuthenticationFilter> jwtFilterRegistrationBean(){
        final FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(jwtAuthenticationFilter);
        registrationBean.setUrlPatterns(Collections.singletonList("/api/users/*"));
        registrationBean.setOrder(1);

        return registrationBean;

    }

    @Bean
    FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean(){
        final FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(corsFilter);
        registrationBean.setUrlPatterns(Collections.singletonList("/api/*"));
        registrationBean.setOrder(0);

        return registrationBean;

    }

}
