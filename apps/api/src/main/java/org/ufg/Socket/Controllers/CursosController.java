package org.ufg.Socket.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.ufg.Domain.Models.Curso;
import org.ufg.Infraestrutura.Servicos.ServicoCurso;
import spark.Route;

public class CursosController {
    private static ServicoCurso _servicoCurso = new ServicoCurso();

    public static Route obterTodos = (req, res) -> {
        return _servicoCurso.obterTodos();
    };

    public static Route salvar = (req, res) -> {
        var json = req.body();
        var curso = new Gson().fromJson(json, Curso.class);
        _servicoCurso.Salvar(curso);
        return "Curso salvo com sucesso";
    };

    public static Route obterPorId = (req, res) -> {
        var id = req.params(":id");
        var curso = _servicoCurso.obterPorId(id);
        if (!curso.containsKey("_id")) {
            res.type("application/json");
            res.status(404);
            return "{\"message\": \"Curso não encontrado\"}";
        }
        res.type("application/json");
        res.status(200);
        return curso.toJson();
    };

    public static Route atualizar = (req, res) -> {
        var id = req.params(":id");
        var json = req.body();
        var curso = new Gson().fromJson(json, Curso.class);
        curso.setId(id);
        _servicoCurso.Atualizar(curso);
        return "Curso atualizado com sucesso";
    };

    public static Route deletar = (req, res) -> {
        var id = req.params(":id");
        _servicoCurso.Deletar(id);
        return "Curso deletado com sucesso";
    };
}

