package com.web2.healboard.services;

import org.springframework.beans.factory.annotation.Autowired;
import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.repositories.CategoriaEquipamentoRepository;

import java.util.List;
public class CategoriaEquipamentoService {
    @Autowired
    private CategoriaEquipamentoRepository repository;

    public List<CategoriaEquipamento> listarCategorias() {
        return repository.findAll();
    }

    public CategoriaEquipamento obterCategoriaPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }

    public CategoriaEquipamento criarCategoria(CategoriaEquipamento categoria) {
        return repository.save(categoria);
    }

    public CategoriaEquipamento atualizarCategoria(Long id, CategoriaEquipamento categoriaAtualizada) {
        CategoriaEquipamento categoriaExistente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        categoriaExistente.setNome(categoriaAtualizada.getNome());
        return repository.save(categoriaExistente);
    }

    public void removerCategoria(Long id) {
        repository.deleteById(id);
    }
}
