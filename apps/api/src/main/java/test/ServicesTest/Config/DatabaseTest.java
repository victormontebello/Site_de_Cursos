package test.ServicesTest.Config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class DatabaseTest {
    private static MongoClient client;
    private static MongoDatabase database;

    public static void setupDatabase() {
        String uri = System.getenv("MONGODB_ATLAS_CONN");;
        client = MongoClients.create(uri);
        client.startSession();
        database = client.getDatabase("test-db");
    }

    public static void teardownDatabase() {
        database.drop();
        client.close();
    }

    public static MongoDatabase getDatabase() {
        return database;
    }
}
