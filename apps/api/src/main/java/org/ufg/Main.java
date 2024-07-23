package org.ufg;
import org.ufg.Socket.Routes.ApiRoutes;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

import java.io.IOException;

public class Main {
    private static final String ANY_ORIGIN = "*";
    private static final String ANY_METHOD = "GET, POST, PUT, DELETE, OPTIONS";
    private static final String ANY_HEADER = "Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin";

    public static void main(String[] args) throws IOException {
        Spark.port(5002);
        enableCORS(ANY_ORIGIN, ANY_METHOD, ANY_HEADER);
        ApiRoutes.configurarRotas();
        Spark.init();
        System.out.println("Servidor rodando na porta 5002");
    }

    public static void enableCORS(final String origin, final String methods, final String headers) {
        Filter filter = new Filter() {
            @Override
            public void handle(Request request, Response response) throws Exception {
                response.header("Access-Control-Allow-Origin", origin);
                response.header("Access-Control-Request-Method", methods);
                response.header("Access-Control-Allow-Headers", headers);
                if (request.requestMethod().equalsIgnoreCase("OPTIONS")) {
                    response.status(200);
                }
            }
        };

        Spark.before(filter);
    }
}