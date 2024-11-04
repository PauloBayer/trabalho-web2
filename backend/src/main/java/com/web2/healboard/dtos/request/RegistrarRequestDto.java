package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RegistrarRequestDto {

    @NotBlank(message = "Nome must not be blank")
    @Size(min = 2, max = 100, message = "Nome must be between 2 and 100 characters")
    private String nome;

    @NotBlank(message = "CPF must not be blank")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF must be in the format XXX.XXX.XXX-XX")
    private String cpf;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "CEP must not be blank")
    @Pattern(regexp = "\\d{5}-\\d{3}", message = "CEP must be in the format XXXXX-XXX")
    private String cep;

    @NotBlank(message = "Telefone must not be blank")
    @Pattern(
            regexp = "^\\([1-9]{2}\\) (?:[2-8]|9[0-9])[0-9]{3}-[0-9]{4}$",
            message = "Telefone must be in the format (XX) 9XXXX-XXXX or (XX) XXXX-XXXX"
    )
    private String telefone;

    @NotNull(message = "Role must not be null")
    @Pattern(regexp = "CLIENTE|FUNCIONARIO", message = "Role must be either CLIENTE or FUNCIONARIO")
    private String role;
}
