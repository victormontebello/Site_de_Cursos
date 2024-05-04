package org.ufg.Socket.Controllers;

import com.google.gson.Gson;
import org.ufg.Domain.Models.Usuario;
import org.ufg.Infraestrutura.Servicos.ServicoUsuario;
import spark.Route;

public class UsuarioController {
    public static ServicoUsuario _servicoUsuario = new ServicoUsuario();

    public static Route obterTodos = (req, res) -> {
        return _servicoUsuario.obterTodos();
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
        res.type("application/json");
        res.status(200);
        return usuario.toJson();
    };

    public static Route atualizar = (req, res) -> {
        var id = req.params(":id");
        var json = req.body();
        var usuario = new Gson().fromJson(json, Usuario.class);
        usuario.setId(id);
        _servicoUsuario.Atualizar(usuario);
        return "Usuário atualizado com sucesso";
    };

    public static Route deletar = (req, res) -> {
        var id = req.params(":id");
        _servicoUsuario.Deletar(id);
        return "Usuário deletado com sucesso";
    };
}
