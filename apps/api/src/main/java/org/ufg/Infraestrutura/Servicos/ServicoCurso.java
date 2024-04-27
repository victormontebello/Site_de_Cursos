package org.ufg.Infraestrutura.Servicos;
import com.mongodb.client.*;
import org.bson.Document;
import org.ufg.Domain.Models.Curso;
import org.ufg.Infraestrutura.Conectores.ConectorCloud;
import org.ufg.Infraestrutura.Interfaces.ICursoRepository;
import java.util.ArrayList;

public class ServicoCurso implements ICursoRepository {
    public final String MONGODB_ATLAS_CONN = System.getenv("MONGODB_ATLAS_CONN");
    @Override
    public ArrayList<Document> obterTodos() {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("cursos", conexao);
        ArrayList<Document> documentos = new ArrayList<>();
        try (MongoCursor<Document> cursor = colecao.find().iterator()) {
            while (cursor.hasNext()) {
                documentos.add(Document.parse(cursor.next().toJson()));
            }
        }

        ConectorCloud.EncerrarConexao(conexao);
        return documentos;
    }

    @Override
    public void Salvar(Curso curso) {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("cursos", conexao);
        Document documento = new Document("nome", curso.getNome())
                .append("descricao", curso.getDescricao())
                .append("cargaHoraria", curso.getHoras());
        colecao.insertOne(documento);
        ConectorCloud.EncerrarConexao(conexao);
    }

    @Override
    public Curso obterPorId(String id) {
        return null;
    }

    @Override
    public void Atualizar(Curso curso) {

    }

    @Override
    public void Deletar(String id) {

    }
}