package com.web2.healboard.services;

import com.web2.healboard.models.historico.HistoricoSolicitacao;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
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
        historicoSolicitacao.setStatusAtual(solicitacao.getStatus());
        historicoSolicitacao.setDescricaoEquipamento(descricaoEquipamento);
        historicoSolicitacao.setDescricaoDefeito(descricaoDefeito);

        this.historicoSolicitacaoRepository.save(historicoSolicitacao);
    }
}
