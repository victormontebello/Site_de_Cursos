package org.ufg;
import com.sun.net.httpserver.*;
import org.ufg.Infraestrutura.MongoConfig;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        var server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/initialize", new MongoConfig.ContextHandler());
        server.setExecutor(null);
        MongoConfig.Connect();
        server.start();
    }
}