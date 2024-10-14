package com.web2.healboard.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.services.CategoriaEquipamentoService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/categorias-equipamento")
public class CategoriaEquipamentoController {

    private final CategoriaEquipamentoService categoriaEquipamentoService;

    @GetMapping
    public ResponseEntity<List<CategoriaEquipamento>> listarCategorias() {
        List<CategoriaEquipamento> categorias = this.categoriaEquipamentoService.listarCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaEquipamento> obterCategoria(@PathVariable Long id) {
        try {
            CategoriaEquipamento categoria = this.categoriaEquipamentoService.obterCategoriaPorId(id);
            return ResponseEntity.ok(categoria);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<CategoriaEquipamento> criarCategoria(@RequestBody CategoriaEquipamento categoria) {
        try {
            CategoriaEquipamento novaCategoria = this.categoriaEquipamentoService.criarCategoria(categoria);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaEquipamento> atualizarCategoria(
        @PathVariable Long id,
        @RequestBody CategoriaEquipamento categoria) {
        try {
            CategoriaEquipamento categoriaAtualizada = this.categoriaEquipamentoService.atualizarCategoria(id, categoria);
            return ResponseEntity.ok(categoriaAtualizada);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerCategoria(@PathVariable Long id) {
        try {
            this.categoriaEquipamentoService.removerCategoria(id);
            return ResponseEntity.noContent().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
