package com.rimatch.rimatchbackend.util;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JWTUtils {
    private  String secretKey;
    JwtParser jwtParser;

    public JWTUtils(@Value("${jwt.secret})") String secretKey){
        this.secretKey = secretKey;
        jwtParser = Jwts.parser().setSigningKey(this.secretKey).build();
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public boolean validateToken(String token) throws JwtException{

        boolean valid = false;
        try{
            jwtParser.parseSignedClaims(token);
            valid = true;
        }catch (JwtException ex){
            throw ex;
        }

        return valid;

    }

    public String extractUsername(String token) {
        return getAllClaims(token).getSubject();
    }

    public Date extractExpiration(String token) {
        return getAllClaims(token).getExpiration();
    }

    public Claims getAllClaims(String token){
        Jws<Claims> jwt = null;
        try{
            jwt = jwtParser.parseSignedClaims(token);
            return jwt.getPayload();
        }catch (JwtException ex){
            throw ex;
        }
    }
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
