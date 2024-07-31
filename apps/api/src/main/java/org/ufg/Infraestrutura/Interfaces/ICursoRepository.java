package org.ufg.Infraestrutura.Interfaces;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.ufg.Domain.Exceptions.CursoNaoEncontradoException;
import org.ufg.Domain.Models.Curso;

import java.util.ArrayList;

public interface ICursoRepository {
    ArrayList<Document> obterTodos(String usuarioId) throws Exception;
    ObjectId Salvar(Curso curso) throws Exception;
    Document obterPorId(String id) throws CursoNaoEncontradoException;
    void Atualizar(Curso curso) throws CursoNaoEncontradoException;
    void Deletar(String id) throws CursoNaoEncontradoException;
    ArrayList<Document> obterCursosDoUsuario(String usuarioId) throws Exception;
}