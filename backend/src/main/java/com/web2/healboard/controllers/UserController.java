package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.ClienteMapper;
import com.web2.healboard.dtos.request.LoginRequestDto;
import com.web2.healboard.dtos.request.RegistrarRequestDto;
import com.web2.healboard.dtos.response.LoginResponseDto;
import com.web2.healboard.dtos.response.RefreshBearerTokenResponseDto;
import com.web2.healboard.exceptions.CredenciaisInvalidasException;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.services.FuncionarioService;
import com.web2.healboard.services.JwtService;
import com.web2.healboard.services.ClienteService;
import com.web2.healboard.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final FuncionarioService funcionarioService;
    private final ClienteService clienteService;
    private final JwtService jwtService;

    @PostMapping("/registrar")
    public ResponseEntity<Void> registrar(@RequestBody @Valid RegistrarRequestDto dto) {
        Cliente cliente = this.clienteService.createCliente(ClienteMapper.toCliente(dto));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto dto) {
        try {
            Object user = this.userService.findByEmail(dto.getEmail());

            if (user instanceof Cliente) {
                Cliente cliente = this.clienteService.findByEmailAndSenha(dto.getEmail(), dto.getSenha());
                return ResponseEntity.ok(new LoginResponseDto(this.jwtService.createToken(cliente), "ROLE_CLIENTE", user));
            }

            if (user instanceof Funcionario) {
                Funcionario funcionario = this.funcionarioService.findByEmailAndSenha(dto.getEmail(), dto.getSenha());
                return ResponseEntity.ok(new LoginResponseDto(this.jwtService.createToken(funcionario), "ROLE_FUNCIONARIO", user));
            }

            throw new CredenciaisInvalidasException("credenciais invalidas");
        } catch (Exception e) {
            throw new CredenciaisInvalidasException("credenciais invalidas");
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<RefreshBearerTokenResponseDto> refreshBearerToken(@RequestHeader("Authorization") String bearerToken) {
        String newBearerToken = this.jwtService.refreshToken(bearerToken);
        return ResponseEntity.ok(new RefreshBearerTokenResponseDto(newBearerToken));
    }
}
