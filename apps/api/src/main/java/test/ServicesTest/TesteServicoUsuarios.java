package test.ServicesTest;

import org.bson.types.ObjectId;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.ufg.Domain.Exceptions.UsuarioNaoEncontradoException;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;
import test.ServicesTest.Config.DatabaseTest;
import test.ServicesTest.DadosTeste.DadosParaTeste;
import test.ServicesTest.ServicosTeste.ServicoUsuarioTeste;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

public class TesteServicoUsuarios {
    public ServicoUsuarioTeste servicoUsuario = new ServicoUsuarioTeste();

    @Before
    public void setUp() {
        DatabaseTest.setupDatabase();
        Spark.port(9999);
        ApiRoutes.configurarRotas();
        Spark.init();
    }

    @After
    public void tearDown() {
        Spark.stop();
        DatabaseTest.teardownDatabase();
    }

    @Test
    public void test_obterTodos() throws Exception {
        var st = Spark.port();
        assertEquals(st, 9999);
        var users = servicoUsuario.obterTodos();
        assertEquals(users.size(), 0);
    }

    @Test
    public void teste_deve_criar_usuario() throws Exception {
        var usuario = DadosParaTeste.ObterUsuarioParaTeste();
        servicoUsuario.Salvar(usuario);
        var usuarios = servicoUsuario.obterTodos();
        assertEquals(usuarios.size(), 1);
    }

    @Test
    public void deve_obter_um_usuario_por_id() throws Exception {
        var usuario = DadosParaTeste.ObterUsuarioParaTeste();
        var usuarioId = servicoUsuario.Salvar(usuario);
        var usuarioPorId = servicoUsuario.obterPorId(usuarioId.toHexString());
        assertEquals(usuarioPorId.get("nome").toString(), usuario.getNome());
    }

    @Test
    public void deve_atualizar_um_usuario() throws Exception {
        var usuario = DadosParaTeste.ObterUsuarioParaTeste();
        var usuarioId = servicoUsuario.Salvar(usuario);
        var usuarioAtualizado = new Usuario();
        usuarioAtualizado.setId(new ObjectId(usuarioId.toHexString()));
        usuarioAtualizado.setNome("ATUALIZADO");
        servicoUsuario.Atualizar(usuarioAtualizado);
        var usuarioAtualizadoPorId = servicoUsuario.obterPorId(usuarioId.toHexString());
        assertEquals(usuarioAtualizadoPorId.get("nome").toString(), usuarioAtualizado.getNome());
    }

    @Test
    public void deve_deletar_um_usuario() throws Exception {
        var usuario = DadosParaTeste.ObterUsuarioParaTeste();
        var usuarioId = servicoUsuario.Salvar(usuario);
        servicoUsuario.Deletar(usuarioId.toHexString());
        var usuarioDeletado = servicoUsuario.obterPorId(usuarioId.toHexString());
        assertEquals(usuarioDeletado.containsKey("_id"), false);
    }

    @Test
    public void deve_retornar_excessao_de_usuario_por_id() throws UsuarioNaoEncontradoException {
        assertThrows(UsuarioNaoEncontradoException.class, () -> servicoUsuario.obterPorId("123456789"));
    }

    @Test
    public void deve_retornar_excessao_de_usuario_nao_encontrado_ao_deletar() throws UsuarioNaoEncontradoException {
        assertThrows(UsuarioNaoEncontradoException.class, () -> servicoUsuario.Deletar("123456789"));
    }
}
