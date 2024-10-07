package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.RegistrarRequestDto;
import com.web2.healboard.models.cliente.Cliente;

public class ClienteMapper {
    public static Cliente toCliente(RegistrarRequestDto dto) {
        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setCpf(dto.getCpf());
        cliente.setEmail(dto.getEmail());
        cliente.setCep(dto.getCep());
        cliente.setTelefone(dto.getTelefone());

        return cliente;
    }
}
