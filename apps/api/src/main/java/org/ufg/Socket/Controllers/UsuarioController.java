package org.ufg.Socket.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Servicos.ServicoUsuario;
import spark.Route;

import java.lang.reflect.Type;

public class UsuarioController {
    public static ServicoUsuario _servicoUsuario = new ServicoUsuario();

    public static Route obterTodos = (req, res) -> {
        var usuarios =  _servicoUsuario.obterTodos();
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, new JsonSerializer<ObjectId>() {
                    @Override
                    public JsonElement serialize(ObjectId src, Type typeOfSrc, JsonSerializationContext context) {
                        return new JsonPrimitive(src.toHexString());
                    }
                })
                .create();
        String jsonResponse = gson.toJson(usuarios);
        res.type("application/json");
        return jsonResponse;
    };

    public static Route salvar = (req, res) -> {
        var json = req.body();
        var usuario = new Gson().fromJson(json, Usuario.class);
        _servicoUsuario.Salvar(usuario);
        return "Usuário salvo com sucesso";
    };

    public static Route obterPorId = (req, res) -> {
        var id = req.params(":id");
        var usuario = _servicoUsuario.obterPorId(id);
        if (!usuario.containsKey("_id")) {
            res.type("application/json");
            res.status(404);
            return "{\"message\": \"Usuário não encontrado\"}";
        }

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, new JsonSerializer<ObjectId>() {
                    @Override
                    public JsonElement serialize(ObjectId src, Type typeOfSrc, JsonSerializationContext context) {
                        return new JsonPrimitive(src.toHexString());
                    }
                })
                .create();

        String jsonResponse = gson.toJson(usuario);
        res.type("application/json");
        res.status(200);

        return jsonResponse;
    };

    public static Route atualizar = (req, res) -> {
        var id = req.params(":id");
        var json = req.body();
        var usuario = new Gson().fromJson(json, Usuario.class);
        usuario.setId(new ObjectId(id));
        _servicoUsuario.Atualizar(usuario);
        return "Usuário atualizado com sucesso";
    };

    public static Route deletar = (req, res) -> {
        var id = req.params(":id");
        _servicoUsuario.Deletar(id);
        return "Usuário deletado com sucesso";
    };
}
