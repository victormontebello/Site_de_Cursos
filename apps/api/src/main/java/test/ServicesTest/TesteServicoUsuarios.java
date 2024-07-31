package test.ServicesTest;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;
import test.ServicesTest.Config.DatabaseTest;
import test.ServicesTest.ServicosTeste.ServicoUsuarioTeste;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

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
        var usuario = new Usuario();
        usuario.setNome("Teste");
        usuario.setEmail("teste@teste.com");
        usuario.setSenha("123456");
        usuario.setTelefone("123456789");
        usuario.setEndereco("Rua Teste, 123");
        usuario.setCidade("Teste");
        usuario.setEstado("SP");
        usuario.setPais("Brasil");
        usuario.setFoto("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
        usuario.setNumeroDeCursos(1);
        usuario.setCursos(new ArrayList<>());
        usuario.setHorasAssistidas(10);
        usuario.setHorasCertificadas(10);
        usuario.setIsAdmin(true);

        servicoUsuario.Salvar(usuario);
        var usuarios = servicoUsuario.obterTodos();
        assertEquals(usuarios.size(), 1);
    }
}
