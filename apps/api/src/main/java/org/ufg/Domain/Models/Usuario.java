package org.ufg.Domain.Models;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;
import javax.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @MongoId
    public String Id;

    @NotBlank(message = "Nome não pode ser vazio")
    @Size(min = 2, max = 50, message = "Nome deve ter no mínimo 2 e no máximo 50 caracteres")
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

    public LocalDateTime DataDeCriacao;

    @Nullable
    public int NumeroDeCursos;

    @Nullable
    public double HorasAssistidas;

    @Nullable
    public double HorasCertificadas;

    public boolean IsAdmin;
    public boolean IsInstructor;
    public boolean IsPremium;
}

