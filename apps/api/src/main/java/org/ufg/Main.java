package org.ufg;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Spark;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        Spark.port(8080);
        ApiRoutes.configurarRotas();
        Spark.init();
    }
}