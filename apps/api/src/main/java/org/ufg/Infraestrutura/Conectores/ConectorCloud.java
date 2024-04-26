package org.ufg.Infraestrutura.Conectores;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;

public class ConectorCloud {
    public static MongoClient ConectarNoBanco() {
        String connectionString = System.getenv("MONGODB_ATLAS_CONN");
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            return mongoClient;
        }
        catch (Exception e) {
            throw new IllegalStateException("Erro ao conectar com o banco de dados", e);
        }
    }

    public static void EncerrarConexao(MongoClient conexao) {
        if (conexao != null) {
            conexao.close();
        }
    }

    public static MongoCollection obterColecao(String nomeColecao, MongoClient conexao) {
        List<Document> databases = conexao.listDatabases().into(new ArrayList<>());
        MongoDatabase database = conexao.getDatabase("NILL");
        MongoCollection<Document> collection = database.getCollection(nomeColecao);
        return collection;
    }
}
