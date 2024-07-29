package org.ufg.Socket.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.ufg.Domain.Enums.CategoriaEnum;
import org.ufg.Domain.Enums.CategoriaEnumDeserializer;
import org.ufg.Domain.Enums.StatusEnum;
import org.ufg.Domain.Enums.StatusEnumDeserializer;
import org.ufg.Domain.Models.Curso;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Servicos.ServicoCurso;
import spark.Route;

import java.lang.reflect.Type;

public class CursosController {
    private static ServicoCurso _servicoCurso = new ServicoCurso();

    public static Route obterTodos = (req, res) -> {
        var params = req.queryParams("usuarioId");

        var cursos =  _servicoCurso.obterTodos(params);
        Gson gson = new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, new JsonSerializer<ObjectId>() {
                    @Override
                    public JsonElement serialize(ObjectId src, Type typeOfSrc, JsonSerializationContext context) {
                        return new JsonPrimitive(src.toHexString());
                    }
                })
                .create();

        String jsonResponse = gson.toJson(cursos);
        res.type("application/json");
        return jsonResponse;
    };

    public static Route salvar = (req, res) -> {
        try {
            var json = req.body();
            var mapper = new ObjectMapper();
            SimpleModule module = new SimpleModule();
            module.addDeserializer(StatusEnum.class, new StatusEnumDeserializer());
            module.addDeserializer(CategoriaEnum.class, new CategoriaEnumDeserializer());
            mapper.registerModule(module);

            var curso = mapper.readValue(json, Curso.class);
            _servicoCurso.Salvar(curso);
            return "Curso salvo com sucesso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(500);
            return "{\"message\": \"Erro ao salvar curso\"}";
        }
    };

    public static Route obterPorId = (req, res) -> {
        try {
            var id = req.params(":id");
            var curso = _servicoCurso.obterPorId(id);
            if (!curso.containsKey("_id")) {
                res.type("application/json");
                res.status(404);
                return "{\"message\": \"Curso não encontrado\"}";
            }

            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(ObjectId.class, new JsonSerializer<ObjectId>() {
                        @Override
                        public JsonElement serialize(ObjectId src, Type typeOfSrc, JsonSerializationContext context) {
                            return new JsonPrimitive(src.toHexString());
                        }
                    })
                    .create();

            String jsonResponse = gson.toJson(curso);
            res.type("application/json");
            res.status(200);
            return curso.toJson();
        } catch (Exception e) {
            res.type("application/json");
            res.status(404);
            return "{\"message\": \"Erro ao obter curso\"}";
        }
    };

    public static Route atualizar = (req, res) -> {
        try {
            var id = req.params(":id");
            var json = req.body();
            var mapper = new ObjectMapper();
            SimpleModule module = new SimpleModule();
            module.addDeserializer(StatusEnum.class, new StatusEnumDeserializer());
            module.addDeserializer(CategoriaEnum.class, new CategoriaEnumDeserializer());
            mapper.registerModule(module);
            var curso = mapper.readValue(json, Curso.class);
            curso.setId(new ObjectId(id));
            _servicoCurso.Atualizar(curso);
            return "Curso atualizado com sucesso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(400);
            return "{\"message\": \"Erro ao atualizar curso\"}";
        }
    };

    public static Route deletar = (req, res) -> {
        try {
            var id = req.params(":id");
            _servicoCurso.Deletar(id);
            return "Curso deletado com sucesso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(404);
            return "{\"message\": \"Erro ao deletar curso\"}";
        }
    };
}

