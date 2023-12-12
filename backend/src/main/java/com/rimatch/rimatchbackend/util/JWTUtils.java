package com.rimatch.rimatchbackend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

@Component
public class JWTUtils {

    private SecretKey secretKey;
    private JwtParser jwtParser;

    public static final int ACCESS_TOKEN_DURATION = 1000 * 60 * 60 * 24; // 1 day
    public static final long REFRESH_TOKEN_DURATION = 30L * 24 * 60 * 60 * 1000; // 30 days

    public JWTUtils(@Value("${jwt.secret})") String secret) throws WeakKeyException, UnsupportedEncodingException {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes("UTF-8"));
        jwtParser = Jwts.parser().verifyWith(this.secretKey).build();
    }

    public String generateAccessToken(String username) {
        Map<String, String> claims = new HashMap<>();
        claims.put("type", "access");
        return Jwts.builder()
                .subject(username)
                .claim("type", "access")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_DURATION)) // 1 day
                .signWith(secretKey)
                .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .claim("type", "refresh")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_DURATION)) // 30 days
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) throws JwtException, IllegalArgumentException {
        try {
            jwtParser.parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            throw ex;
        }

    }

    public String extractUsername(String token) {
        return getAllClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return getAllClaims(token).getExpiration();
    }

    public Claims getAllClaims(String token) throws JwtException {
        Jws<Claims> jwt = null;
        try {
            jwt = jwtParser.parseSignedClaims(token);
            return jwt.getPayload();
        } catch (JwtException ex) {
            throw ex;
        }
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
