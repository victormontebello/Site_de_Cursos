package org.ufg.Infraestrutura.Interfaces;

import org.bson.Document;
import org.ufg.Domain.Models.Usuario;

import java.util.ArrayList;

public interface IUsuarioRepository {
    void Salvar(Usuario usuario);
    void Atualizar(Usuario usuario);
    void Deletar(String id);
    Document obterPorId(String id);
    ArrayList<Document> obterTodos();
    void VincularCurso(Usuario usuario, Document curso);
}
