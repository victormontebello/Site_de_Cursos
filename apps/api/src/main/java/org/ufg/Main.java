package org.ufg;

import org.ufg.Socket.Routes.ApiRoutes;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

import java.io.IOException;

public class Main {
    private static final String ALLOWED_ORIGIN = "http://localhost:5173";
    private static final String ANY_METHOD = "GET, POST, PUT, DELETE, OPTIONS";
    private static final String ANY_HEADER = "Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin";

    public static void main(String[] args) throws IOException {
        Spark.port(5002);
        enableCORS(ALLOWED_ORIGIN, ANY_METHOD, ANY_HEADER);
        ApiRoutes.configurarRotas();
        Spark.init();
        System.out.println("Servidor rodando na porta 5002");
    }

    private static void enableCORS(final String origin, final String methods, final String headers) {
        Filter filter = new Filter() {
            @Override
            public void handle(Request request, Response response) throws Exception {
                response.header("Access-Control-Allow-Origin", origin);
                response.header("Access-Control-Allow-Methods", methods);
                response.header("Access-Control-Allow-Headers", headers);
                response.header("Access-Control-Allow-Credentials", "true");

                // Handle CORS pre-flight request
                if (request.requestMethod().equalsIgnoreCase("OPTIONS")) {
                    response.status(200);
                    response.header("Access-Control-Max-Age", "86400");
                    response.body("OK");
                    Spark.halt();
                }
            }
        };

        Spark.before(filter);

        // Handle preflight (OPTIONS) requests
        Spark.options("/*", (request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Allow-Methods", methods);
            response.header("Access-Control-Allow-Headers", headers);
            response.header("Access-Control-Allow-Credentials", "true");
            response.header("Access-Control-Max-Age", "86400");
            response.status(200);
            return "OK";
        });
    }
}
