package test.ServicesTest;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.ufg.Infraestrutura.Servicos.ServicoUsuario;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;
import test.ServicesTest.Config.DatabaseTest;

import static org.junit.Assert.assertEquals;

public class TesteServicoCurso {

    public ServicoUsuario servicoUsuario = new ServicoUsuario();
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
        Spark.port(9999);
        ApiRoutes.configurarRotas();
        Spark.init();
        var st = Spark.port();
        assertEquals(st, 9999);
        var users = servicoUsuario.obterTodos();
        assertEquals(users.size(), 0);
    }
}
