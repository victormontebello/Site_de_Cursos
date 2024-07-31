package test.ServicesTest.ServicosTeste;

import com.mongodb.client.*;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.ufg.Domain.Exceptions.CursoNaoEncontradoException;
import org.ufg.Domain.Models.Curso;
import org.ufg.Infraestrutura.Interfaces.ICursoRepository;
import test.ServicesTest.Config.ConectorCloudTeste;
import java.util.ArrayList;

@EnableCaching
public class ServicoCursoTeste implements ICursoRepository {
    public final String MONGODB_ATLAS_CONN = System.getenv("MONGODB_ATLAS_CONN");

    @Cacheable("cursos")
    @Override
    public ArrayList<Document> obterTodos(String usuarioId) throws Exception {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            if (usuarioId != null) {
                var documentos = obterCursosDoUsuario(usuarioId);
                ConectorCloudTeste.EncerrarConexao(conexao);
                return documentos;
            }
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("cursos", conexao);
            ArrayList<Document> documentos = new ArrayList<>();
            try (MongoCursor<Document> cursor = colecao.find().iterator()) {
                while (cursor.hasNext()) {
                    documentos.add(Document.parse(cursor.next().toJson()));
                }
            }

            ConectorCloudTeste.EncerrarConexao(conexao);
            return documentos;
        } catch (Exception e) {
            throw new Exception("Erro ao obter todos cursos", e);
        }
    }

    @Override
    public void Salvar(Curso curso) throws Exception {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("cursos", conexao);
            Document documento = new Document("nome", curso.getNome())
                    .append("descricao", curso.getDescricao())
                    .append("cargaHoraria", curso.getHoras())
                    .append("valor", curso.getValor())
                    .append("possuiCertificado", curso.isPossuiCertificado())
                    .append("status", curso.getStatus())
                    .append("categorias", curso.getCategorias())
                    .append("numeroDeAulas", curso.getNumeroDeAulas())
                    .append("autorId", curso.getAutorId())
                    .append("data", curso.getDataDePublicacao());

            colecao.insertOne(documento);
            ConectorCloudTeste.EncerrarConexao(conexao);
        } catch (Exception e) {
            throw new Exception("Erro ao salvar curso", e);
        }
    }

    @Cacheable("curso")
    @Override
    public Document obterPorId(String id) throws CursoNaoEncontradoException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("cursos", conexao);
            Document documento = (Document) colecao.find(new Document("_id", new ObjectId(id))).first();
            ConectorCloudTeste.EncerrarConexao(conexao);
            if (documento == null) {
                return new Document();
            }
            return documento;
        } catch (Exception e) {
            throw new CursoNaoEncontradoException("Erro ao obter curso");
        }
    }

    @Override
    public void Atualizar(Curso curso) throws CursoNaoEncontradoException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("cursos", conexao);
            Document documento = new Document("nome", curso.getNome())
                    .append("descricao", curso.getDescricao())
                    .append("cargaHoraria", curso.getHoras())
                    .append("valor", curso.getValor())
                    .append("possuiCertificado", curso.isPossuiCertificado())
                    .append("status", curso.getStatus().toString())
                    .append("categorias", curso.getCategorias())
                    .append("numeroDeAulas", curso.getNumeroDeAulas())
                    .append("autorId", curso.getAutorId())
                    .append("data", curso.getDataDePublicacao());

            colecao.updateOne(new Document("_id", new ObjectId(String.valueOf(curso.getId()))), new Document("$set", documento));
            ConectorCloudTeste.EncerrarConexao(conexao);
        }
        catch (Exception e) {
            throw new CursoNaoEncontradoException("Erro ao atualizar curso");
        }
    }

    @Override
    public ArrayList<Document> obterCursosDoUsuario(String usuarioId) throws Exception {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);
            var colecaoDeCursos = ConectorCloudTeste.obterColecao("cursos", conexao);
            var usuario = (Document)colecao.find(new Document("_id", new ObjectId(usuarioId))).first();
            var cursosIds = (ArrayList<String>) usuario.get("cursos");
            var cursosDoUsuario = new ArrayList<Document>();

            for (String id : cursosIds) {
                cursosDoUsuario.add((Document) colecaoDeCursos.find(new Document("_id", new ObjectId(id))).first());
            }

            ConectorCloudTeste.EncerrarConexao(conexao);
            return cursosDoUsuario;
        } catch (Exception e) {
            throw new Exception("Erro ao obter cursos do usuario " + e.getMessage(), e);
        }
    }

    @Override
    public void Deletar(String id) throws CursoNaoEncontradoException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("cursos", conexao);
            var resultado = colecao.find(new Document("_id", new ObjectId(id))).first();
            if (resultado == null) {
                return;
            }
            colecao.deleteOne(new Document("_id", new ObjectId(id)));
            ConectorCloudTeste.EncerrarConexao(conexao);
        } catch (Exception e) {
            throw new CursoNaoEncontradoException("Erro ao deletar curso");
        }
    }
}
