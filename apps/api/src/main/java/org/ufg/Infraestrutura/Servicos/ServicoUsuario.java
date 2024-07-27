package org.ufg.Infraestrutura.Servicos;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Conectores.ConectorCloud;
import org.ufg.Infraestrutura.Interfaces.IUsuarioRepository;

import java.util.ArrayList;

@EnableCaching
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
                .append("cursos", usuario.getCursos())
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
                .append("cursos", usuario.getCursos())
                .append("numeroDeCursos", usuario.getNumeroDeCursos())
                .append("horasAssistidas", usuario.getHorasAssistidas())
                .append("horasCertificadas", usuario.getHorasCertificadas())
                .append("isAdmin", usuario.IsAdmin)
                .append("isInstructor", usuario.IsInstructor)
                .append("isPremium", usuario.IsPremium);

        colecao.updateOne(new Document("_id", new ObjectId(String.valueOf(usuario.getId()))), new Document("$set", documento));
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

    @Cacheable("usuario")
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

    @Cacheable("usuarios")
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

    @Override
    public void VincularCurso(Usuario usuario, Document curso) {
        var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
        conexao.startSession();
        var colecao = ConectorCloud.obterColecao("usuarios", conexao);
        colecao.updateOne(new Document("_id", new ObjectId(String.valueOf(usuario.getId()))), Updates.push("cursos", curso.get("_id").toString()));
        ConectorCloud.EncerrarConexao(conexao);
    }
}
