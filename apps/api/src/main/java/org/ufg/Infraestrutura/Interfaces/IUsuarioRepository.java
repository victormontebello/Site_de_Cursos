package org.ufg.Infraestrutura.Interfaces;

import com.mongodb.MongoClientException;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.ufg.Domain.Exceptions.UsuarioNaoEncontradoException;
import org.ufg.Domain.Models.Usuario;

import java.util.ArrayList;

public interface IUsuarioRepository {
    ObjectId Salvar(Usuario usuario) throws Exception;
    void Atualizar(Usuario usuario) throws UsuarioNaoEncontradoException;
    void Deletar(String id) throws UsuarioNaoEncontradoException;
    Document obterPorId(String id) throws UsuarioNaoEncontradoException;
    ArrayList<Document> obterTodos() throws Exception;
    void VincularCurso(Usuario usuario, Document curso) throws MongoClientException;
    void CancelarCurso(Usuario usuario, Document curso) throws MongoClientException;
}
