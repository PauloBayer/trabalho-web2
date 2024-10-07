package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FuncionarioRequestDto {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 255, message = "Senha deve ter entre 2 e 255 caracteres")
    private String nome;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Data de nascimento é obrigatório")
    @Pattern(
            regexp = "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$",
            message = "Data de nascimento deve estar no formato dd/MM/yyyy"
    )
    private String dataNascimento;

    @NotBlank(message = "Senha é obrigatório")
    @Size(min = 2, max = 100, message = "Senha deve ter entre 2 e 100 caracteres")
    private String senha;
}
