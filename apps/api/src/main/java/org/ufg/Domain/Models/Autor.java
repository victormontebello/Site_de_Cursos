package org.ufg.Domain.Models;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;
import javax.validation.constraints.*;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Autor extends Usuario {

    @MongoId
    public String Id;

    @NotBlank(message = "o nome não pode ser vazio")
    @Size(min = 2, max = 50, message = "o nome deve ter no mínimo 2 e no máximo 50 caracteres")
    public String Nome;

    @Email(message = "Email deve ser válido")
    public String Email;

    @NotBlank(message = "Senha deve ser preenchida")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    public String Senha;

    @Pattern(regexp = "\\d{10,11}", message = "Telefone deve conter 10 ou 11 dígitos")
    public String Telefone;

    @Nullable
    public String Endereco;

    @Nullable
    public String Cidade;

    @Nullable
    public String Estado;

    @Nullable
    public String Pais;

    @Nullable
    public String Foto;

    @Nullable
    public String Biografia;

    @Nullable
    public String Site;

    @Nullable
    public String Facebook;

    @Nullable
    public String Twitter;

    @Nullable
    public String Linkedin;

    public String Github;

    @Nullable
    public String Youtube;

    @Nullable
    public String Instagram;

    public boolean IsAdmin;

    public boolean IsInstructor;

    public boolean IsPremium;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Autor autor = (Autor) o;
        return Id.equals(autor.Id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id);
    }
}

