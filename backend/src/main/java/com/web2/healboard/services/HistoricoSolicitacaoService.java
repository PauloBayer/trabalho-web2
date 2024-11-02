package com.web2.healboard.services;

import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.historico.HistoricoSolicitacao;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.manutencao.StatusSolicitacao;
import com.web2.healboard.repositories.HistoricoSolicitacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class HistoricoSolicitacaoService {

    private final HistoricoSolicitacaoRepository historicoSolicitacaoRepository;

    public List<HistoricoSolicitacao> findBySolicitacaoManutencao(SolicitacaoManutencao solicitacaoManutencao) {
        return this.historicoSolicitacaoRepository.findBySolicitacaoManutencao(solicitacaoManutencao);
    }

    public void setStatusAberta(SolicitacaoManutencao solicitacao, String descricaoEquipamento, String descricaoDefeito) {
        HistoricoSolicitacao historicoSolicitacao = new HistoricoSolicitacao();

        historicoSolicitacao.setSolicitacaoManutencao(solicitacao);
        historicoSolicitacao.setStatusAnterior(null);
        historicoSolicitacao.setStatusAtual(StatusSolicitacao.ABERTA);
        historicoSolicitacao.setDescricaoEquipamento(descricaoEquipamento);
        historicoSolicitacao.setDescricaoDefeito(descricaoDefeito);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }

    public void setStatusOrcada(SolicitacaoManutencao solicitacao, Float valorOrcado, Funcionario funcionario) {
        HistoricoSolicitacao historicoSolicitacao = new HistoricoSolicitacao();

        historicoSolicitacao.setSolicitacaoManutencao(solicitacao);
        historicoSolicitacao.setStatusAnterior(solicitacao.getStatus());
        historicoSolicitacao.setFuncionario(funcionario);
        historicoSolicitacao.setStatusAtual(StatusSolicitacao.ORCADA);
        historicoSolicitacao.setValorOrcado(valorOrcado);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }

    public void setStatusAprovada(SolicitacaoManutencao solicitacao) {
        HistoricoSolicitacao historicoSolicitacao = new HistoricoSolicitacao();

        historicoSolicitacao.setSolicitacaoManutencao(solicitacao);
        historicoSolicitacao.setStatusAnterior(solicitacao.getStatus());
        historicoSolicitacao.setStatusAtual(StatusSolicitacao.APROVADA);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }

    public void setStatusRejeitada(SolicitacaoManutencao solicitacao, String motivoRejeicao) {
        HistoricoSolicitacao historicoSolicitacao = new HistoricoSolicitacao();

        historicoSolicitacao.setSolicitacaoManutencao(solicitacao);
        historicoSolicitacao.setStatusAnterior(solicitacao.getStatus());
        historicoSolicitacao.setStatusAtual(StatusSolicitacao.REJEITADA);
        historicoSolicitacao.setMotivoRejeicao(motivoRejeicao);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }

    public void setStatusAguardandoPagamento(
            SolicitacaoManutencao solicitacao,
            String descricaoManutencao,
            String orientacoesManutencao,
            Funcionario funcionario
    ) {
        HistoricoSolicitacao historicoSolicitacao = new HistoricoSolicitacao();

        historicoSolicitacao.setSolicitacaoManutencao(solicitacao);
        historicoSolicitacao.setStatusAnterior(solicitacao.getStatus());
        historicoSolicitacao.setFuncionario(funcionario);
        historicoSolicitacao.setStatusAtual(StatusSolicitacao.AGUARDANDO_PAGAMENTO);
        historicoSolicitacao.setDescricaoManutencao(descricaoManutencao);
        historicoSolicitacao.setOrientacoesManutencao(orientacoesManutencao);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }

    public void setStatusRedirecionada(SolicitacaoManutencao solicitacao, Funcionario funcionarioAtual, Funcionario funcionarioDestino) {
        HistoricoSolicitacao historicoSolicitacao = new HistoricoSolicitacao();

        historicoSolicitacao.setSolicitacaoManutencao(solicitacao);
        historicoSolicitacao.setStatusAnterior(solicitacao.getStatus());
        historicoSolicitacao.setFuncionario(funcionarioAtual);
        historicoSolicitacao.setStatusAtual(StatusSolicitacao.REDIRECIONADA);
        historicoSolicitacao.setFuncionarioDestino(funcionarioDestino);
        historicoSolicitacao.setFuncionarioOrigem(funcionarioAtual);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }
}
