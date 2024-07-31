package test.ServicesTest;

import org.bson.types.ObjectId;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.ufg.Domain.Enums.StatusEnum;
import org.ufg.Domain.Exceptions.CursoNaoEncontradoException;
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
import static org.junit.Assert.assertThrows;

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

    @Test
    public void deve_obter_curso_por_id() throws Exception {
        var curso = DadosParaTeste.ObterCursoParaTeste();
        var cursoId = servicoCurso.Salvar(curso);
        var cursoPorId = servicoCurso.obterPorId(cursoId.toHexString());
        assertEquals(cursoPorId.get("nome").toString(), curso.getNome());
    }

    @Test
    public void deve_atualizar_curso() throws Exception {
        var curso = DadosParaTeste.ObterCursoParaTeste();
        var cursoId = servicoCurso.Salvar(curso);
        var cursoAtualizado = new Curso();
        cursoAtualizado.setId(new ObjectId(cursoId.toHexString()));
        cursoAtualizado.setNome("ATUALIZADO");
        servicoCurso.Atualizar(cursoAtualizado);
        var cursoAtualizadoPorId = servicoCurso.obterPorId(cursoId.toHexString());
        assertEquals(cursoAtualizadoPorId.get("nome").toString(), cursoAtualizado.getNome());
    }

    @Test
    public void deve_deletar_curso() throws Exception {
        var curso = DadosParaTeste.ObterCursoParaTeste();
        var cursoId = servicoCurso.Salvar(curso);
        servicoCurso.Deletar(cursoId.toHexString());
        var cursoDeletado = servicoCurso.obterPorId(cursoId.toHexString());
        assertEquals(cursoDeletado.containsKey("_id"), false);
    }

    @Test
    public void deve_retornar_excessao_de_curso_por_id() throws CursoNaoEncontradoException {
        assertThrows(CursoNaoEncontradoException.class, () -> servicoCurso.obterPorId("123456789"));
    }

    @Test
    public void deve_retornar_excessao_de_curso_nao_encontrado_ao_deletar() throws CursoNaoEncontradoException {
        assertThrows(CursoNaoEncontradoException.class, () -> servicoCurso.Deletar("123456789"));
    }
}

