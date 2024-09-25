package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.UserMapper;
import com.web2.healboard.dtos.request.RegistrarRequestDto;
import com.web2.healboard.models.user.User;
import com.web2.healboard.services.JwtService;
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
    private final JwtService jwtService;

    @PostMapping("/registrar")
    public ResponseEntity<Void> registrar(@RequestBody @Valid RegistrarRequestDto dto) {
        User user = this.userService.createUser(UserMapper.toUser(dto));
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto dto) {
//        User user = this.userService.findUserByUsernameAndPassword(dto.getUsername(), dto.getPassword());
//        String token = this.jwtService.createToken(user);
//        return ResponseEntity.ok(new LoginResponseDto(token));
//    }

//    @GetMapping("/refresh")
//    public ResponseEntity<RefreshBearerTokenResponseDto> refreshBearerToken(@RequestHeader("Authorization") String bearerToken) {
//        String newBearerToken = this.jwtService.refreshToken(bearerToken);
//        return ResponseEntity.ok(new RefreshBearerTokenResponseDto(newBearerToken));
//    }
}
