package org.ufg.Infraestrutura.Interfaces;
import com.mongodb.client.FindIterable;
import org.bson.Document;
import org.ufg.Domain.Models.Curso;

import java.util.ArrayList;

public interface ICursoRepository {
    ArrayList<Document> obterTodos();
    void Salvar();
    Curso obterPorId(String id);
    void Atualizar(Curso curso);
    void Deletar(String id);
}
