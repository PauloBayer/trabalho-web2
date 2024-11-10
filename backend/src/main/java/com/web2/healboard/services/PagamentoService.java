package com.web2.healboard.services;

import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.pagamento.Pagamento;
import com.web2.healboard.repositories.PagamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PagamentoService {

    private final PagamentoRepository pagamentoRepository;

    public void realizarPagamento(SolicitacaoManutencao solicitacaoManutencao, Float valor) {
        Pagamento pagamento = new Pagamento();
        pagamento.setValor(valor);
        pagamento.setSolicitacaoManutencao(solicitacaoManutencao);
        this.pagamentoRepository.save(pagamento);
    }

    public Pagamento getPagamentoBySolicitacaoId(UUID id) {
        return pagamentoRepository.findBySolicitacaoManutencaoId(id).orElse(null);
    }
}
