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
        var curso = new Curso();
        curso.setNome("Curso de Teste");
        curso.setDescricao("Descricao do curso de teste");
        curso.setHoras(10);
        curso.setValor(100);
        curso.setPossuiCertificado(true);
        curso.setStatus(StatusEnum.ATIVO);
        curso.setCategorias(new ArrayList<>());
        curso.setNumeroDeAulas(10);
        curso.setAutorId(new ObjectId("66368c571d6ebe7f719e3c58"));
        curso.setDataDePublicacao("2022-01-01");
        servicoCurso.Salvar(curso);
        var cursos = servicoCurso.obterTodos(null);
        assertEquals(cursos.size(), 1);
    }
}
