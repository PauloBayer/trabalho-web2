package com.web2.healboard.controllers;

import com.web2.healboard.dtos.response.ErrorResponseDto;
import com.web2.healboard.exceptions.CpfJaRegistradoException;
import com.web2.healboard.exceptions.EmailJaRegistradoException;
import com.web2.healboard.exceptions.SenhaInvalidaException;
import com.web2.healboard.exceptions.TokenJwtInvalidoException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ErrorResponseDto> methodArgumentNotValidExceptionHandler(
            MethodArgumentNotValidException e,
            BindingResult bindingResult
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.UNPROCESSABLE_ENTITY, "invalid fields", bindingResult);
        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(TokenJwtInvalidoException.class)
    private ResponseEntity<ErrorResponseDto> invalidJwtTokenExceptionHandler(
            TokenJwtInvalidoException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.UNAUTHORIZED, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(RuntimeException.class)
    private ResponseEntity<ErrorResponseDto> runtimeExceptionHandler(
            RuntimeException e
    ) {
        log.info(String.valueOf(e.getCause()) + " | " + e.getMessage() + " | " + e.getClass());

        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(BadCredentialsException.class)
    private ResponseEntity<ErrorResponseDto> badCredentialsExceptionHandler(
            BadCredentialsException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.UNAUTHORIZED, "bad credentials");
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<ErrorResponseDto> entityNotFoundExceptionHandler(
            EntityNotFoundException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(EmailJaRegistradoException.class)
    private ResponseEntity<ErrorResponseDto> emailJaRegistradoExceptionHandler(
            EmailJaRegistradoException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.CONFLICT, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(CpfJaRegistradoException.class)
    private ResponseEntity<ErrorResponseDto> cpfJaRegistradoExceptionHandler(
            CpfJaRegistradoException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.CONFLICT, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(SenhaInvalidaException.class)
    private ResponseEntity<ErrorResponseDto> senhaInvalidaExceptionHandler(
            SenhaInvalidaException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.UNAUTHORIZED, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    private ResponseEntity<ErrorResponseDto> httpMessageNotReadableExceptionHandler(
            HttpMessageNotReadableException e
    ) {
        ErrorResponseDto restErrorDto = new ErrorResponseDto(HttpStatus.BAD_REQUEST, e.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(restErrorDto);
    }
}
