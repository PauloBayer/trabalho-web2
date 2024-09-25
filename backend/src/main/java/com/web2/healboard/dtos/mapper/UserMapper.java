package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.RegistrarRequestDto;
import com.web2.healboard.models.user.User;
import com.web2.healboard.models.user.UserRoleEnum;

public class UserMapper {
    public static User toUser(RegistrarRequestDto dto) {
        User user = new User();
        user.setNome(dto.getNome());
        user.setCpf(dto.getCpf());
        user.setEmail(dto.getEmail());
        user.setCep(dto.getCep());
        user.setTelefone(dto.getTelefone());
        user.setRole(UserRoleEnum.valueOf(dto.getRole()));

        return user;
    }
}
