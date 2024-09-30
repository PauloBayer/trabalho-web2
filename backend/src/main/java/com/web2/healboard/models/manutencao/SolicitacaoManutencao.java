package com.web2.healboard.models.manutencao;

import lombok.Data;
import jakarta.persistence.*; 
import java.time.LocalDateTime;

@Data
@Entity
public class SolicitacaoManutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String descricaoEquipamento;

    @Column(nullable = false)
    private String categoriaEquipamento;

    @Column(nullable = false)
    private String descricaoDefeito;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusSolicitacao status;

    public SolicitacaoManutencao() {
        this.dataHora = LocalDateTime.now();
        this.status = StatusSolicitacao.ABERTA;
    }
}
