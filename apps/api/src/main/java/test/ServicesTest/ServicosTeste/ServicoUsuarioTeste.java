package test.ServicesTest.ServicosTeste;

import com.mongodb.MongoClientException;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.ufg.Domain.Exceptions.UsuarioNaoEncontradoException;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Interfaces.IUsuarioRepository;
import test.ServicesTest.Config.ConectorCloudTeste;

import java.util.ArrayList;

@EnableCaching
public class ServicoUsuarioTeste implements IUsuarioRepository {
    public final String MONGODB_ATLAS_CONN = System.getenv("MONGODB_ATLAS_CONN");

    @Override
    public void Salvar(Usuario usuario) throws Exception {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);
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
                    .append("cursos", new ArrayList<>())
                    .append("horasAssistidas", usuario.getHorasAssistidas())
                    .append("horasCertificadas", usuario.getHorasCertificadas())
                    .append("isAdmin", usuario.IsAdmin)
                    .append("isInstructor", usuario.IsInstructor)
                    .append("isPremium", usuario.IsPremium);

            colecao.insertOne(documento);
            ConectorCloudTeste.EncerrarConexao(conexao);
        }
        catch (Exception e) {
            throw new Exception("Erro ao salvar usuario", e);
        }
    }

    @Override
    public void Atualizar(Usuario usuario) throws UsuarioNaoEncontradoException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);
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
            ConectorCloudTeste.EncerrarConexao(conexao);
        } catch (Exception e) {
            throw new UsuarioNaoEncontradoException("Erro ao atualizar usuario");
        }
    }

    @Override
    public void Deletar(String id) throws UsuarioNaoEncontradoException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);
            colecao.deleteOne(new Document("_id", new ObjectId(id)));
            ConectorCloudTeste.EncerrarConexao(conexao);
        } catch (Exception e) {
            throw new UsuarioNaoEncontradoException("Erro ao deletar usuario");
        }
    }

    @Cacheable("usuario")
    @Override
    public Document obterPorId(String id) throws UsuarioNaoEncontradoException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);
            Document documento = (Document) colecao.find(new Document("_id", new ObjectId(id))).first();
            ConectorCloudTeste.EncerrarConexao(conexao);
            if (documento == null) {
                return new Document();
            }
            return documento;
        } catch (Exception e) {
            throw new UsuarioNaoEncontradoException("Erro ao obter usuario");
        }
    }

    @Cacheable("usuarios")
    @Override
    public ArrayList<Document> obterTodos() throws Exception {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);
            ArrayList<Document> documentos = new ArrayList<>();
            try (MongoCursor<Document> cursor = colecao.find().iterator()) {
                while (cursor.hasNext()) {
                    documentos.add(Document.parse(cursor.next().toJson()));
                }
            } catch (Exception e) {
                throw new Exception("Erro ao ler todos usuarios do banco", e);
            }

            ConectorCloudTeste.EncerrarConexao(conexao);
            return documentos;
        } catch (Exception e) {
            throw new Exception("Erro ao obter todos usuarios", e);
        }
    }

    @Override
    public void VincularCurso(Usuario usuario, Document curso) throws MongoClientException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);

            var updateOperation = Updates.combine(
                    Updates.push("cursos", curso.get("_id").toString()),
                    Updates.inc("numeroDeCursos", 1)
            );

            colecao.updateOne(new Document("_id", new ObjectId(String.valueOf(usuario.getId()))), updateOperation);
            ConectorCloudTeste.EncerrarConexao(conexao);
        } catch (Exception e) {
            throw new MongoClientException("Erro ao vincular curso ao usuario", e);
        }
    }

    @Override
    public void CancelarCurso(Usuario usuario, Document curso) throws MongoClientException {
        try {
            var conexao = MongoClients.create(MONGODB_ATLAS_CONN);
            conexao.startSession();
            var colecao = ConectorCloudTeste.obterColecao("usuarios", conexao);

            var updateOperation = Updates.combine(
                    Updates.pull("cursos", curso.get("_id").toString()),
                    Updates.inc("numeroDeCursos", -1)
            );

            colecao.updateOne(new Document("_id", new ObjectId(String.valueOf(usuario.getId()))), updateOperation);
            ConectorCloudTeste.EncerrarConexao(conexao);
        } catch (Exception e) {
            throw new MongoClientException("Erro ao cancelar curso ao usuario", e);
        }
    }
}
