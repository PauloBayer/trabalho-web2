package com.web2.healboard.models.pagamento;

import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "tb_pagamento_servico")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "id_solicitacao_manutencao", nullable = false)
    private SolicitacaoManutencao solicitacaoManutencao;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private CategoriaEquipamento categoria;

    @Column(name = "valor", nullable = false)
    private Float valor;

    @CreationTimestamp
    @Column(name = "data_hora_criacao", nullable = false)
    private LocalDateTime dataHoraCriacao;

    // Remove any manual getters or setters for 'categoria' and 'dataHoraCriacao'
}
