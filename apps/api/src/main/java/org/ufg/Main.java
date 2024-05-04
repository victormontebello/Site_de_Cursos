package org.ufg;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Spark.port(5002);
        ApiRoutes.configurarRotas();
        Spark.init();
        System.out.println("Servidor rodando na porta 5002");
    }
}