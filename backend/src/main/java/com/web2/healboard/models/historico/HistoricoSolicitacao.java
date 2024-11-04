package com.web2.healboard.models.historico;

import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.manutencao.StatusSolicitacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "tb_historico_solicitacao")
public class HistoricoSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_solicitacao", nullable = false)
    private SolicitacaoManutencao solicitacaoManutencao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private StatusSolicitacao statusAnterior;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusSolicitacao statusAtual;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = true)
    private Funcionario funcionario;

    @CreationTimestamp
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Column(nullable = true)
    private String descricaoEquipamento;

    @Column(nullable = true)
    private String descricaoDefeito;

    @Column(nullable = true)
    private Float valorOrcado;

    @Column(nullable = true)
    private String motivoRejeicao;

    @ManyToOne
    @JoinColumn(name = "id_funcionario_origem", nullable = true)
    private Funcionario funcionarioOrigem;

    @ManyToOne
    @JoinColumn(name = "id_funcionario_destino", nullable = true)
    private Funcionario funcionarioDestino;

    @Column(nullable = true)
    private String orientacoesManutencao;

    @Column(nullable = true)
    private String descricaoManutencao;
}
