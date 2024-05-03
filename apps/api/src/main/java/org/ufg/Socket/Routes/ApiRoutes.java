package org.ufg.Socket.Routes;

import org.ufg.Socket.Controllers.CursosController;
import spark.Spark;

public class ApiRoutes {
    public static void configurarRotas() {
        Spark.get("/cursos", CursosController.obterTodos);
        Spark.post("/cursos", CursosController.salvar);
        Spark.get("/cursos/:id", CursosController.obterPorId);
        Spark.put("/cursos/:id", CursosController.atualizar);
        Spark.delete("/cursos/:id", CursosController.deletar);
    }
}
