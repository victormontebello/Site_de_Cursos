package test.ServicesTest.Config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;

public class ConectorCloudTeste {
    public static void EncerrarConexao(MongoClient conexao) {
        if (conexao != null) {
            conexao.close();
        }
    }

    public static MongoCollection obterColecao(String nomeColecao, MongoClient conexao) {
        List<Document> databases = conexao.listDatabases().into(new ArrayList<>());
        MongoDatabase database = conexao.getDatabase("test-db");
        MongoCollection<Document> collection = database.getCollection(nomeColecao);
        return collection;
    }
}
