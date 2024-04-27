package org.ufg.Socket.Controllers;

import org.ufg.Infraestrutura.Servicos.ServicoCurso;
import spark.Route;

public class CursosController {
    private static ServicoCurso _servicoCurso = new ServicoCurso();

    public static Route obterTodos = (req, res) -> {
        return _servicoCurso.obterTodos();
    };
}
