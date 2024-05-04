package org.ufg.Infraestrutura.Servicos;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCursor;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Conectores.ConectorCloud;
import org.ufg.Infraestrutura.Interfaces.IUsuarioRepository;

import java.util.ArrayList;

public class ServicoUsuario implements IUsuarioRepository {
    public final String MONGODB_ATLAS_CONN = System.getenv("MONGODB_ATLAS_CONN");

    @Override
    public void Salvar(Usuario usuario) {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("usuarios", conexao);
        Document documento = new Document("nome", usuario.getNome())
                .append("email", usuario.getEmail())
                .append("senha", usuario.getSenha())
                .append("telefone", usuario.getTelefone())
                .append("endereco", usuario.getEndereco())
                .append("cidade", usuario.getCidade())
                .append("estado", usuario.getEstado())
                .append("pais", usuario.getPais())
                .append("foto", usuario.getFoto())
                .append("numeroDeCursos", usuario.getNumeroDeCursos())
                .append("horasAssistidas", usuario.getHorasAssistidas())
                .append("horasCertificadas", usuario.getHorasCertificadas())
                .append("isAdmin", usuario.IsAdmin)
                .append("isInstructor", usuario.IsInstructor)
                .append("isPremium", usuario.IsPremium);

        colecao.insertOne(documento);
        ConectorCloud.EncerrarConexao(conexao);

    }

    @Override
    public void Atualizar(Usuario usuario) {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("usuarios", conexao);
        Document documento = new Document("nome", usuario.getNome())
                .append("email", usuario.getEmail())
                .append("senha", usuario.getSenha())
                .append("telefone", usuario.getTelefone())
                .append("endereco", usuario.getEndereco())
                .append("cidade", usuario.getCidade())
                .append("estado", usuario.getEstado())
                .append("pais", usuario.getPais())
                .append("foto", usuario.getFoto())
                .append("numeroDeCursos", usuario.getNumeroDeCursos())
                .append("horasAssistidas", usuario.getHorasAssistidas())
                .append("horasCertificadas", usuario.getHorasCertificadas())
                .append("isAdmin", usuario.IsAdmin)
                .append("isInstructor", usuario.IsInstructor)
                .append("isPremium", usuario.IsPremium);

        colecao.updateOne(new Document("_id", new ObjectId(usuario.getId())), new Document("$set", documento));
        ConectorCloud.EncerrarConexao(conexao);
    }

    @Override
    public void Deletar(String id) {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("usuarios", conexao);
        colecao.deleteOne(new Document("_id", new ObjectId(id)));
        ConectorCloud.EncerrarConexao(conexao);
    }

    @Override
    public Document obterPorId(String id) {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("usuarios", conexao);
        Document documento = (Document) colecao.find(new Document("_id", new ObjectId(id))).first();
        ConectorCloud.EncerrarConexao(conexao);
        if (documento == null) {
            return new Document();
        }
        return documento;
    }

    @Override
    public ArrayList<Document> obterTodos() {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("usuarios", conexao);
        ArrayList<Document> documentos = new ArrayList<>();
        try (MongoCursor<Document> cursor = colecao.find().iterator()) {
            while (cursor.hasNext()) {
                documentos.add(Document.parse(cursor.next().toJson()));
            }
        }

        ConectorCloud.EncerrarConexao(conexao);
        return documentos;
    }
}
