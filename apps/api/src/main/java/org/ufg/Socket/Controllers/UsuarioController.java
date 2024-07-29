package org.ufg.Socket.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import org.bson.types.ObjectId;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Servicos.ServicoCurso;
import org.ufg.Infraestrutura.Servicos.ServicoUsuario;
import spark.Route;

import java.lang.reflect.Type;

public class UsuarioController {
    public static ServicoUsuario _servicoUsuario = new ServicoUsuario();
    public static ServicoCurso _servicoCurso = new ServicoCurso();

    public static Route obterTodos = (req, res) -> {
        try {
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
        } catch (Exception e) {
            res.type("application/json");
            res.status(400);
            return "{\"message\": \"Erro ao obter todos usuarios\"}" + e.getMessage();
        }
    };

    public static Route salvar = (req, res) -> {
        var json = req.body();
        var mapper = new ObjectMapper();
        var usuario = mapper.readValue(json, Usuario.class);
        _servicoUsuario.Salvar(usuario);
        return "Usuário salvo com sucesso";
    };

    public static Route obterPorId = (req, res) -> {
        try {
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
        } catch (Exception e) {
            res.type("application/json");
            res.status(400);
            return "{\"message\": \"Erro ao obter usuario\"}" + e.getMessage();
        }
    };

    public static Route atualizar = (req, res) -> {
        try {
            var id = req.params(":id");
            var json = req.body();
            var mapper = new ObjectMapper();
            var usuario = mapper.readValue(json, Usuario.class);
            usuario.setId(new ObjectId(id));
            _servicoUsuario.Atualizar(usuario);
            return "Usuário atualizado com sucesso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(400);
            return "{\"message\": \"Erro ao atualizar usuario\"}" + e.getMessage();
        }
    };

    public static Route deletar = (req, res) -> {
        try {
            var id = req.params(":id");
            _servicoUsuario.Deletar(id);
            return "Usuário deletado com sucesso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(404);
            return "{\"message\": \"Erro ao deletar usuario\"}" + e.getMessage();
        }
    };

    public static Route vincularCurso = (req, res) -> {
        try {
            var id = req.params(":id");
            var cursoId = req.params(":cursoId");

            var usuarioDocument = _servicoUsuario.obterPorId(id);
            if (!usuarioDocument.containsKey("_id")) {
                res.type("application/json");
                res.status(404);
                return "{\"message\": \"Usuário não encontrado\"}" ;
            }

            var usuario = new Usuario();
            usuario.setId(new ObjectId(id));

            var curso = _servicoCurso.obterPorId(cursoId);
            if (!curso.containsKey("_id")) {
                res.type("application/json");
                res.status(404);
                return "{\"message\": \"Curso não encontrado\"}";
            }

            _servicoUsuario.VincularCurso(usuario, curso);
            return "Usuário vinculado com sucesso ao curso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(400);
            return "{\"message\": \"Erro ao vincular curso ao usuario\"}" + e.getMessage();
        }
    };

    public static Route cancelarCurso = (req, res) -> {
        try {
            var id = req.params(":id");
            var cursoId = req.params(":cursoId");

            var usuarioDocument = _servicoUsuario.obterPorId(id);
            if (!usuarioDocument.containsKey("_id")) {
                res.type("application/json");
                res.status(404);
                return "{\"message\": \"Usuário não encontrado\"}" ;
            }

            var usuario = new Usuario();
            usuario.setId(new ObjectId(id));

            var curso = _servicoCurso.obterPorId(cursoId);
            if (!curso.containsKey("_id")) {
                res.type("application/json");
                res.status(404);
                return "{\"message\": \"Curso não encontrado\"}";
            }

            _servicoUsuario.CancelarCurso(usuario, curso);
            return "Usuário vinculado com sucesso ao curso";
        } catch (Exception e) {
            res.type("application/json");
            res.status(400);
            return "{\"message\": \"Erro ao cancelar curso ao usuario\"}" + e.getMessage();
        }
    };
}
