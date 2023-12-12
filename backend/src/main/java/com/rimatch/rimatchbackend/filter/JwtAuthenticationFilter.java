package com.rimatch.rimatchbackend.filter;

import com.rimatch.rimatchbackend.util.JWTUtils;
import com.rimatch.rimatchbackend.util.JWTUtils.TokenType;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;

    public JwtAuthenticationFilter(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }
    /*
    *   Middleware that checks request for auth header and validates it and forwards them to next in filter chain
    * */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = httpRequest.getHeader("Authorization");

        token = token.substring(7);

        try{
            jwtUtils.validateToken(token, TokenType.ACCESS);
            filterChain.doFilter(request,response);
        }catch (JwtException | IllegalArgumentException ex){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("{\"message\":\"Invalid JWT token\"}");
        }
    }
}

