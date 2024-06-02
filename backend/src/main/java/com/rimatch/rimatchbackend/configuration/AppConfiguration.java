package com.rimatch.rimatchbackend.configuration;

import com.rimatch.rimatchbackend.filter.CorsFilter;
import com.rimatch.rimatchbackend.filter.JwtAuthenticationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableMongoAuditing
public class AppConfiguration {

    @Bean
    FilterRegistrationBean<JwtAuthenticationFilter> jwtFilterRegistrationBean(JwtAuthenticationFilter jwtAuthenticationFilter) {
        final FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(jwtAuthenticationFilter);
        registrationBean.setUrlPatterns(Arrays.asList("/api/users/*", "/api/match/*"));
        registrationBean.setOrder(1);

        return registrationBean;
    }

    @Bean
    FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean(CorsFilter corsFilter) {
        final FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(corsFilter);
        registrationBean.setUrlPatterns(Collections.singletonList("/api/*"));
        registrationBean.setOrder(0);

        return registrationBean;
    }

    @Bean
    MongoTransactionManager transactionManager(MongoDatabaseFactory dbFactory) {
        return new MongoTransactionManager(dbFactory);
    }
}
