package org.ufg.Domain.Models;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements Serializable {

    @MongoId
    public String Id;

    @Nullable
    public String Nome;

    @Nullable
    public String Email;

    @Nullable
    public String Senha;

    @Nullable
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
    public int NumeroDeCursos;

    @Nullable
    public double HorasAssistidas;

    @Nullable
    public double HorasCertificadas;

    public boolean IsAdmin;
    public boolean IsInstructor;
    public boolean IsPremium;
}

