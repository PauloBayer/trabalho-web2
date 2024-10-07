package com.web2.healboard.models.user;

import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
@Getter
public class UserDetailsImpl implements org.springframework.security.core.userdetails.UserDetails {

    private final String email;
    private final String senha;
    private final Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl fromCliente(Cliente cliente) {
        return new UserDetailsImpl(
                cliente.getEmail(),
                null,
                Collections.singleton(new SimpleGrantedAuthority("ROLE_CLIENTE"))
        );
    }

    public static UserDetailsImpl fromFuncionario(Funcionario funcionario) {
        return new UserDetailsImpl(
                funcionario.getEmail(),
                null,
                Collections.singleton(new SimpleGrantedAuthority("ROLE_FUNCIONARIO"))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
