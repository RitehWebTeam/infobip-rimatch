package com.rimatch.rimatchbackend.filter;


import com.rimatch.rimatchbackend.util.JWTUtils;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;

    @Autowired
    public JwtAuthenticationFilter(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = httpRequest.getHeader("Authorization");

        token = token.substring(7);

        if(jwtUtils.validateToken(token)){
            filterChain.doFilter(request,response);
        }else{
            ResponseEntity<String> responseEntity = new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
            ((HttpServletResponse) response).setStatus(responseEntity.getStatusCodeValue());
            response.getWriter().write(responseEntity.getBody());
        }

    }
}

