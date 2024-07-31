package test.ServicesTest.DadosTeste;

import org.bson.types.ObjectId;
import org.ufg.Domain.Enums.StatusEnum;
import org.ufg.Domain.Models.Curso;
import org.ufg.Domain.Models.Usuario;

import java.util.ArrayList;

public class DadosParaTeste {

    public static Usuario ObterUsuarioParaTeste() {
        var usuario = new Usuario();
        usuario.setNome("Teste");
        usuario.setEmail("teste@teste.com");
        usuario.setSenha("123456");
        usuario.setTelefone("123456789");
        usuario.setEndereco("Rua Teste, 123");
        usuario.setCidade("Teste");
        usuario.setEstado("SP");
        usuario.setPais("Brasil");
        usuario.setFoto("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
        usuario.setNumeroDeCursos(1);
        usuario.setCursos(new ArrayList<>());
        usuario.setHorasAssistidas(10);
        usuario.setHorasCertificadas(10);
        usuario.setIsAdmin(true);
        return usuario;
    }

    public static Curso ObterCursoParaTeste() {
        var curso = new Curso();
        curso.setNome("Curso de Teste");
        curso.setDescricao("Descricao do curso de teste");
        curso.setHoras(10);
        curso.setValor(100);
        curso.setPossuiCertificado(true);
        curso.setStatus(StatusEnum.ATIVO);
        curso.setCategorias(new ArrayList<>());
        curso.setNumeroDeAulas(10);
        curso.setAutorId(new ObjectId("66368c571d6ebe7f719e3c58"));
        curso.setDataDePublicacao("2022-01-01");
        return curso;
    }
}


