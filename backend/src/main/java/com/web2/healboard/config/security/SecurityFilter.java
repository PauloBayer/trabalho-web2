package com.web2.healboard.config.security;

import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.user.UserDetailsImpl;
import com.web2.healboard.services.JwtService;
import com.web2.healboard.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = (authHeader != null) ? authHeader.replace("Bearer ", "") : null;

        if (token != null) {
            String email = this.jwtService.getTokenSubject(token);
            Object user = this.userService.findByEmail(email);

            UserDetailsImpl userDetailsImpl = null;

            if (user instanceof Cliente)
                userDetailsImpl = UserDetailsImpl.fromCliente((Cliente) user);
            else if (user instanceof Funcionario)
                userDetailsImpl = UserDetailsImpl.fromFuncionario((Funcionario) user);

            if (userDetailsImpl != null) {
                var authentication = new UsernamePasswordAuthenticationToken(
                        userDetailsImpl,
                        null,
                        userDetailsImpl.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
