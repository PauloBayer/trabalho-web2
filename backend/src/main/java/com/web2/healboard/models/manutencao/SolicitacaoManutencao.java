package com.web2.healboard.models.manutencao;

import com.web2.healboard.models.user.User;
import lombok.Data;
import jakarta.persistence.*; 
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
    private User cliente;

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
