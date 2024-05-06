package test.ServicesTest;

import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;

import static org.junit.Assert.assertEquals;

public class TesteServicoCurso {

    @Test
    public void test_obterTodos() {
        Spark.port(9999);
        ApiRoutes.configurarRotas();
        Spark.init();
        var st = Spark.port();
        assertEquals(st, 9999);
    }
}
