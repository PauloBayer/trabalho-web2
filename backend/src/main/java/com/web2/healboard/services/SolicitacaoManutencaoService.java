package com.web2.healboard.services;

import com.web2.healboard.exceptions.AcaoNaoPermitidaException;
import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.manutencao.StatusSolicitacao;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.pagamento.Pagamento;
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
    private final FuncionarioService funcionarioService;
    private final CategoriaEquipamentoService categoriaEquipamentoService;
    private final PagamentoService pagamentoService;

    public void registrarSolicitacao(
            String nomeCategoria,
            String descricaoEquipamento,
            String descricaoDefeito,
            Cliente cliente
    ) {
        CategoriaEquipamento categoriaEquipamento = this.categoriaEquipamentoService.findCategoriaByNome(nomeCategoria);

        SolicitacaoManutencao solicitacaoManutencao = new SolicitacaoManutencao();
        solicitacaoManutencao.setDescricaoEquipamento(descricaoEquipamento);
        solicitacaoManutencao.setDescricaoDefeito(descricaoDefeito);
        solicitacaoManutencao.setCliente(cliente);
        solicitacaoManutencao.setStatus(StatusSolicitacao.ABERTA);
        solicitacaoManutencao.setCategoriaEquipamento(categoriaEquipamento);

        SolicitacaoManutencao newSolicitacao = this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
        this.historicoSolicitacaoService.setStatusAberta(
                newSolicitacao, newSolicitacao.getDescricaoEquipamento(), newSolicitacao.getDescricaoDefeito()
        );
    }

    public SolicitacaoManutencao obterSolicitacaoPorId(UUID id) {
        SolicitacaoManutencao solicitacao = solicitacaoManutencaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitação não encontrada"));

        Pagamento pagamento = this.pagamentoService.getPagamentoBySolicitacaoId(id);
        solicitacao.setPagamento(pagamento);

        return solicitacao;
    }

    public SolicitacaoManutencao obterSolicitacaoPorIdEUser(UUID id, Cliente cliente) {
        SolicitacaoManutencao solicitacao = solicitacaoManutencaoRepository.findByIdAndClienteId(id, cliente.getId()).orElseThrow(
                () -> new EntityNotFoundException("Solicitação não encontrada")
        );

        Pagamento pagamento = this.pagamentoService.getPagamentoBySolicitacaoId(id);
        solicitacao.setPagamento(pagamento);

        return solicitacao;
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

    public void efetuarOrcamento(UUID idSolicitacao, Funcionario funcionario, Float valorOrcado, String orientacoesExtras) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorId(idSolicitacao);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.ABERTA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser ABERTA");

        this.historicoSolicitacaoService.setStatusOrcada(solicitacaoManutencao, valorOrcado, funcionario, orientacoesExtras);
        solicitacaoManutencao.setStatus(StatusSolicitacao.ORCADA);
        solicitacaoManutencao.setValorOrcado(valorOrcado);
        solicitacaoManutencao.setOrientacoesExtrasOrcamento(orientacoesExtras);
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

    public void resgatarServico(UUID idSolicitacao, Cliente cliente) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorIdEUser(idSolicitacao, cliente);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.REJEITADA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser REJEITADA");

        this.historicoSolicitacaoService.setStatusAprovada(solicitacaoManutencao);
        solicitacaoManutencao.setStatus(StatusSolicitacao.APROVADA);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void efetuarManutencao(UUID idSolicitacao, Funcionario funcionario, String descricaoManutencao, String orientacoesManutencao) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorId(idSolicitacao);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.APROVADA
                && solicitacaoManutencao.getStatus() != StatusSolicitacao.REDIRECIONADA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser APROVADA ou REDIRECIONADA");

        this.historicoSolicitacaoService.setStatusAguardandoPagamento(
                solicitacaoManutencao, descricaoManutencao, orientacoesManutencao, funcionario
        );
        solicitacaoManutencao.setStatus(StatusSolicitacao.AGUARDANDO_PAGAMENTO);
        solicitacaoManutencao.setDescricaoManutencao(descricaoManutencao);
        solicitacaoManutencao.setOrientacoesManutencao(orientacoesManutencao);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void redirecionarManutencao(UUID idSolicitacao, Funcionario funcionarioAtual, Long idFuncionarioDestino) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorId(idSolicitacao);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.APROVADA
                && solicitacaoManutencao.getStatus() != StatusSolicitacao.REDIRECIONADA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser APROVADA ou REDIRECIONADA");

        if (!solicitacaoManutencao.getFuncionario().equals(funcionarioAtual))
            throw new AcaoNaoPermitidaException("não é possível redirecionar porque não está responsável por essa solicitação");

        Funcionario funcionarioDestino = this.funcionarioService.findById(idFuncionarioDestino);

        this.historicoSolicitacaoService.setStatusRedirecionada(solicitacaoManutencao, funcionarioAtual, funcionarioDestino);
        solicitacaoManutencao.setStatus(StatusSolicitacao.REDIRECIONADA);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void pagarServico(UUID idSolicitacao, Cliente cliente) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorIdEUser(idSolicitacao, cliente);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.AGUARDANDO_PAGAMENTO)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser AGUARDANDO PAGAMENTO");

        this.pagamentoService.realizarPagamento(solicitacaoManutencao, solicitacaoManutencao.getValorOrcado());
        this.historicoSolicitacaoService.setStatusPaga(solicitacaoManutencao);
        solicitacaoManutencao.setStatus(StatusSolicitacao.PAGA);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }

    public void finalizarManutencao(UUID idSolicitacao, Funcionario funcionario) {
        SolicitacaoManutencao solicitacaoManutencao = this.obterSolicitacaoPorId(idSolicitacao);

        if (solicitacaoManutencao.getStatus() != StatusSolicitacao.PAGA)
            throw new AcaoNaoPermitidaException("status da solicitacao deve ser PAGA");

        this.historicoSolicitacaoService.setStatusFinalizada(solicitacaoManutencao, funcionario);
        solicitacaoManutencao.setStatus(StatusSolicitacao.FINALIZADA);
        this.solicitacaoManutencaoRepository.save(solicitacaoManutencao);
    }
}
