package com.web2.healboard.services;

import com.web2.healboard.exceptions.AcaoNaoPermitidaException;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.historico.HistoricoSolicitacao;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.manutencao.StatusSolicitacao;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.repositories.HistoricoSolicitacaoRepository;
import com.web2.healboard.repositories.SolicitacaoManutencaoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SolicitacaoManutencaoService {

    private final HistoricoSolicitacaoService historicoSolicitacaoService;
    private final SolicitacaoManutencaoRepository solicitacaoManutencaoRepository;

    public void registrarSolicitacao(
            SolicitacaoManutencao solicitacao,
            Cliente cliente
    ) {
        solicitacao.setCliente(cliente);
        solicitacao.setStatus(StatusSolicitacao.ABERTA);

        SolicitacaoManutencao newSolicitacao = this.solicitacaoManutencaoRepository.save(solicitacao);
        this.historicoSolicitacaoService.setStatusAberta(
                newSolicitacao, newSolicitacao.getDescricaoEquipamento(), newSolicitacao.getDescricaoDefeito()
        );
    }

    public SolicitacaoManutencao obterSolicitacaoPorId(UUID id) {
        return solicitacaoManutencaoRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Solicitação não encontrada")
        );
    }

    public SolicitacaoManutencao obterSolicitacaoPorIdEUser(UUID id, Cliente cliente) {
        return solicitacaoManutencaoRepository.findByIdAndClienteId(id, cliente.getId()).orElseThrow(
                () -> new EntityNotFoundException("Solicitação não encontrada")
        );
    }

    public void atualizarSolicitacao(UUID id, SolicitacaoManutencao novaSolicitacao, Cliente cliente) {
        SolicitacaoManutencao solicitacaoExistente = obterSolicitacaoPorId(id);

        if (!Objects.equals(solicitacaoExistente.getCliente().getId(), cliente.getId()))
            throw new AccessDeniedException("Solicitação não encontrada");

        solicitacaoExistente.setDescricaoEquipamento(novaSolicitacao.getDescricaoEquipamento());
        solicitacaoExistente.setCategoriaEquipamento(novaSolicitacao.getCategoriaEquipamento());
        solicitacaoExistente.setDescricaoDefeito(novaSolicitacao.getDescricaoDefeito());

        this.solicitacaoManutencaoRepository.save(solicitacaoExistente);
    }

    public void excluirSolicitacao(UUID id, Cliente cliente) {
        SolicitacaoManutencao solicitacao = this.obterSolicitacaoPorId(id);

        if (!Objects.equals(solicitacao.getCliente().getId(), cliente.getId()))
            throw new AccessDeniedException("Solicitação não encontrada");

        this.solicitacaoManutencaoRepository.delete(solicitacao);
    }

    public List<SolicitacaoManutencao> obterSolicitacoesPorClienteId(Long clienteId) {
        return solicitacaoManutencaoRepository.findByClienteId(clienteId);
    }

    public List<SolicitacaoManutencao> findAll() {
        return this.solicitacaoManutencaoRepository.findAll();
    }

    public void efetuarOrcamento(UUID idSolicitacao, Funcionario funcionario, Float valorOrcado) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorId(idSolicitacao);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.ABERTA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser ABERTA");

        this.historicoSolicitacaoService.setStatusOrcada(solicitacaoManutencao, valorOrcado, funcionario);
        solicitacaoManutencao.setStatus(StatusSolicitacao.ORCADA);
        solicitacaoManutencao.setValorOrcado(valorOrcado);
        solicitacaoManutencao.setFuncionario(funcionario);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void aprovarServico(UUID idSolicitacao, Cliente cliente) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorIdEUser(idSolicitacao, cliente);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.ORCADA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser ORÇADA");

        this.historicoSolicitacaoService.setStatusAprovada(solicitacaoManutencao);
        solicitacaoManutencao.setStatus(StatusSolicitacao.APROVADA);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void rejeitarServico(UUID idSolicitacao, Cliente cliente, String motivoRejeicao) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorIdEUser(idSolicitacao, cliente);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.ORCADA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser ORÇADA");

        this.historicoSolicitacaoService.setStatusRejeitada(solicitacaoManutencao, motivoRejeicao);
        solicitacaoManutencao.setStatus(StatusSolicitacao.REJEITADA);
        solicitacaoManutencao.setMotivoRejeicao(motivoRejeicao);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void resgatarServico() {
        // status deve ser REJEITADA
        // solicitacao.setStatus(APROVADA)
    }

    public void pagarServico() {
        // status deve ser AGUARDANDO PAGAMENTO
    }

    public void efetuarManutencao() {
        // status deve ser APROVADA
    }

    public void redirecionarManutencao() {
        // status deve ser APROVADA ou REDIRECIONADA
        // dataHora, funcionario origem e destino
        // mudar para REDIRECIONADA
    }

    public void finalizarManutencao() {
        // status deve ser FINALIZADA
    }
}
