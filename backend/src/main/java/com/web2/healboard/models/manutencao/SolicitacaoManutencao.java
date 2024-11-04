package com.web2.healboard.models.manutencao;

import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
public class SolicitacaoManutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = true)
    private Funcionario funcionario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusSolicitacao status;

    @CreationTimestamp
    @Column(name = "data_hora_criacao", nullable = false)
    private LocalDateTime dataHoraCriacao;

    @UpdateTimestamp
    @Column(name = "data_hora_atualizacao", nullable = true)
    private LocalDateTime dataHoraAtualizacao;

    @Column(nullable = false)
    private String categoriaEquipamento;

    @Column(nullable = false)
    private String descricaoEquipamento;

    @Column(nullable = false)
    private String descricaoDefeito;

    @Column(nullable = true)
    private Float valorOrcado;

    @Column(nullable = true)
    private String motivoRejeicao;

    @Column(name = "data_hora_pagamento")
    private LocalDateTime dataHoraPagamento;

    @Column(nullable = true)
    private String orientacoesManutencao;

    @Column(nullable = true)
    private String descricaoManutencao;
}
