package org.ufg.Domain.Models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @MongoId
    public String Id;
    public String Nome;
    public String Email;
    public String Senha;
    public String Telefone;
    public String Endereco;
    public String Cidade;
    public String Estado;
    public String Pais;
    public String Foto;
    public LocalDateTime DataDeCriacao;
    public int NumeroDeCursos;
    public double HorasAssistidas;
    public double HorasCertificadas;
    public boolean IsAdmin;
    public boolean IsInstructor;
    public boolean IsPremium;
}
