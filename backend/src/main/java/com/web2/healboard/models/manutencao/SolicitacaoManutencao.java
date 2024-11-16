package com.web2.healboard.models.manutencao;

import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.pagamento.Pagamento;
import lombok.Data;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "tb_solicitacao_manutencao")
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

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private CategoriaEquipamento categoriaEquipamento;

    @Column(nullable = false)
    private String descricaoEquipamento;

    @Column(nullable = false)
    private String descricaoDefeito;

    @Column(nullable = true)
    private Float valorOrcado;

    @Column(nullable = true)
    private String orientacoesExtrasOrcamento;

    @Column(nullable = true)
    private String motivoRejeicao;

    @Column(nullable = true)
    private String orientacoesManutencao;

    @Column(nullable = true)
    private String descricaoManutencao;

    @Transient
    private Pagamento pagamento;
}
