package org.ufg;
import com.sun.net.httpserver.*;
import org.apache.log4j.BasicConfigurator;
import org.ufg.Infraestrutura.MongoConfig;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        BasicConfigurator.configure();
        var server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/initialize", new MongoConfig.ContextHandler());
        server.setExecutor(null);
        server.start();
        MongoConfig.Connect();
    }
}