package org.ufg.Socket.Controllers;

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
        return _servicoCurso.obterPorId(id);
    };
}

