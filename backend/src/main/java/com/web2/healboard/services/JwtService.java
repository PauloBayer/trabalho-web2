package com.web2.healboard.services;

import com.web2.healboard.exceptions.TokenJwtInvalidoException;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@RequiredArgsConstructor
@Service
public class JwtService {

    @Value("${spring.security.jwt.secret-key}")
    public String SECRET_KEY;
    private final String JWT_BEARER = "Bearer ";
    private final String JWT_AUTHORIZATION = "Authorization";
    private final long EXPIRE_DAYS = 0;
    private final long EXPIRE_HOURS = 2;
    private final long EXPIRE_MINUTES = 30;
    private final UserService userService;

    public String createToken(Funcionario funcionario) {
        Date issuedAt = new Date();
        Date limit = this.generateToExpireDate(issuedAt);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(funcionario.getEmail())
                .setIssuedAt(issuedAt)
                .setExpiration(limit)
                .signWith(
                        Keys.hmacShaKeyFor(this.SECRET_KEY.getBytes(StandardCharsets.UTF_8)),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String createToken(Cliente cliente) {
        Date issuedAt = new Date();
        Date limit = this.generateToExpireDate(issuedAt);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(cliente.getEmail())
                .setIssuedAt(issuedAt)
                .setExpiration(limit)
                .signWith(
                        Keys.hmacShaKeyFor(this.SECRET_KEY.getBytes(StandardCharsets.UTF_8)),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(this.SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(this.refactorToken(token));

            return true;
        } catch (JwtException e) {
            throw new TokenJwtInvalidoException("bearer token invalido");
        }
    }

    public String refreshToken(String oldToken) {
        try {
            this.validateToken(oldToken);
            String username = this.getTokenSubject(oldToken);
            Object user = this.userService.findByEmail(username);

            if (user instanceof Cliente)
                return this.createToken((Cliente) user);
            else if (user instanceof Funcionario)
                return this.createToken((Funcionario) user);
            else
                throw new TokenJwtInvalidoException("bearer token antigo é invalido ou expirado");
        } catch (Exception e) {
            throw new TokenJwtInvalidoException("bearer token antigo é invalido ou expirado");
        }
    }

    public String getTokenSubject(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(this.SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(refactorToken(token))
                    .getBody();

            return (claims != null) ? claims.getSubject() : null;
        } catch (RuntimeException e) {
            throw new TokenJwtInvalidoException("bearer token invalido");
        }
    }

    public String refactorToken(String token) {
        return token.startsWith(this.JWT_BEARER) ? token.substring(this.JWT_BEARER.length()) : token;
    }

    private Date generateToExpireDate(Date start) {
        LocalDateTime dateTime = start.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalDateTime end = dateTime.plusDays(this.EXPIRE_DAYS).plusHours(this.EXPIRE_HOURS).plusMinutes(this.EXPIRE_MINUTES);
        return Date.from(end.atZone(ZoneId.systemDefault()).toInstant());
    }
}
