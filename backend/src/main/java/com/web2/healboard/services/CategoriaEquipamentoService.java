package com.web2.healboard.services;

import com.web2.healboard.exceptions.CategoriaInativaException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.repositories.CategoriaEquipamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaEquipamentoService {
    @Autowired
    private CategoriaEquipamentoRepository repository;

    public List<CategoriaEquipamento> listarCategorias() {
        return repository.findAll();
    }

    public CategoriaEquipamento obterCategoriaPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));
    }

    public CategoriaEquipamento criarCategoria(CategoriaEquipamento categoria) {
        categoria.setNome(categoria.getNome().toUpperCase());
        return repository.save(categoria);
    }

    public CategoriaEquipamento atualizarCategoria(Long id, CategoriaEquipamento categoriaAtualizada) {
        CategoriaEquipamento categoriaExistente = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Categoria não encontrada"));

        categoriaExistente.setNome(categoriaAtualizada.getNome());
        return repository.save(categoriaExistente);
    }

    public void removerCategoria(Long id) {
        this.repository.deleteById(id);
    }

    public CategoriaEquipamento findCategoriaByNome(String nome) {
        nome = nome.toUpperCase();
        Optional<CategoriaEquipamento> optionalCategoria = this.repository.findByNome(nome);
        if (optionalCategoria.isEmpty())
            throw new EntityNotFoundException("Categoria com o nome " + nome + " não encontrada");

        return optionalCategoria.get();
    }
}
