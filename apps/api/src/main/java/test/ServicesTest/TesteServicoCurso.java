package test.ServicesTest;

import org.bson.types.ObjectId;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.ufg.Domain.Enums.StatusEnum;
import org.ufg.Domain.Models.Curso;
import org.ufg.Infraestrutura.Servicos.ServicoUsuario;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;
import test.ServicesTest.Config.DatabaseTest;
import test.ServicesTest.DadosTeste.DadosParaTeste;
import test.ServicesTest.ServicosTeste.ServicoCursoTeste;

import java.util.ArrayList;
import java.util.Date;

import static org.junit.Assert.assertEquals;

public class TesteServicoCurso {

    public ServicoCursoTeste servicoCurso = new ServicoCursoTeste();

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
    public void teste_obterTodos() throws Exception {
        var st = Spark.port();
        assertEquals(st, 9999);
        var cursos = servicoCurso.obterTodos(null);
        assertEquals(cursos.size(), 0);
    }

    @Test
    public void teste_deve_criar_curso() throws Exception {
        var curso = DadosParaTeste.ObterCursoParaTeste();
        servicoCurso.Salvar(curso);
        var cursos = servicoCurso.obterTodos(null);
        assertEquals(cursos.size(), 1);
    }
}

