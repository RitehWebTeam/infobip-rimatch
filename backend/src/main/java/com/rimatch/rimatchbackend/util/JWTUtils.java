package com.rimatch.rimatchbackend.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

@Component
public class JWTUtils {

    public enum TokenType {
        ACCESS, REFRESH
    }

    public static final Map<TokenType, Long> TOKEN_DURATION = Map.of(
            TokenType.ACCESS, 1000 * 60 * 60 * 24L, // 1 day
            TokenType.REFRESH, 30L * 24 * 60 * 60 * 1000 // 30 days
    );

    private final Map<TokenType, SecretKey> SECRET_KEYS = new HashMap<>();

    public JWTUtils(@Value("${jwt.secret.access}") String accessSecret,
            @Value("${jwt.secret.refresh}") String refreshSecret)
            throws WeakKeyException, UnsupportedEncodingException {
        SECRET_KEYS.put(TokenType.ACCESS, Keys.hmacShaKeyFor(accessSecret.getBytes(StandardCharsets.UTF_8)));
        SECRET_KEYS.put(TokenType.REFRESH, Keys.hmacShaKeyFor(refreshSecret.getBytes(StandardCharsets.UTF_8)));
    }

    public String generateAccessToken(String username) {
        return Jwts.builder()
                .subject(username)
                .claim("type", "access")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + TOKEN_DURATION.get(TokenType.ACCESS)))
                .signWith(SECRET_KEYS.get(TokenType.ACCESS))
                .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .subject(username)
                .claim("type", "refresh")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + TOKEN_DURATION.get(TokenType.REFRESH)))
                .signWith(SECRET_KEYS.get(TokenType.REFRESH))
                .compact();
    }

    public Claims validateToken(String token, TokenType type) throws JwtException, IllegalArgumentException {
        try {
            final SecretKey key = SECRET_KEYS.get(type);
            return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        } catch (JwtException | IllegalArgumentException ex) {
            throw ex;
        }

    }

    public String extractSubject(String token, TokenType type) {
        return this.validateToken(token, type).getSubject();
    }
}
