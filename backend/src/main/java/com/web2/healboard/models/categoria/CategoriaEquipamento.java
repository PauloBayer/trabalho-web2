package com.web2.healboard.models.categoria;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_categoria")
public class CategoriaEquipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nome;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Boolean ativo = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @UpdateTimestamp
    private LocalDateTime dataAtualizacao;

    public void desativar() {
        this.ativo = false;
    }

    public void ativar() {
        this.ativo = true;
    }
}