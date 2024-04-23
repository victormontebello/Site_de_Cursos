package org.ufg.Domain.Models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Autor extends Usuario {
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
    public String Biografia;
    public String Site;
    public String Facebook;
    public String Twitter;
    public String Linkedin;
    public String Github;
    public String Youtube;
    public String Instagram;
    public boolean IsAdmin;
    public boolean IsInstructor;
    public boolean IsPremium;
}
