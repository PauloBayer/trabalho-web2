package com.web2.healboard.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Data
public class ErrorResponseDto {
    private int status;
    private String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, String> errors;

    public ErrorResponseDto(HttpStatus status, String message) {
        this.status = status.value();
        this.message = message;
    }

    public ErrorResponseDto(HttpStatus status, String message, BindingResult bindingResult) {
        this.status = status.value();
        this.message = message;
        this.addErrors(bindingResult);
    }

    private void addErrors(BindingResult bindingResult) {
        this.errors = new HashMap<>();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            this.errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
    }
}
