package org.ufg.Socket.Routes;

import org.ufg.Socket.Controllers.CursosController;
import spark.Spark;

public class ApiRoutes {
    public static void configurarRotas() {
        Spark.get("/cursos", CursosController.obterTodos);
        Spark.post("/cursos", CursosController.salvar);
    }
}
