package org.ufg.Infraestrutura.Interfaces;
import org.bson.Document;
import org.ufg.Domain.Models.Curso;

import java.util.ArrayList;

public interface ICursoRepository {
    ArrayList<Document> obterTodos();
    void Salvar(Curso curso);
    Document obterPorId(String id);
    void Atualizar(Curso curso);
    void Deletar(String id);
}