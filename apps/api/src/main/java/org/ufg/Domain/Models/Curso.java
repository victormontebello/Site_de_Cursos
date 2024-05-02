package org.ufg.Domain.Models;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.ufg.Domain.Enums.CategoriaEnum;
import org.ufg.Domain.Enums.StatusEnum;
import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Curso {

    public String Id;

    @JsonProperty("nome")
    public String Nome;

    public String Descricao;

    public double Horas;

    public double Valor;

    public boolean PossuiCertificado;

    public StatusEnum Status;

    public ArrayList<CategoriaEnum> Categorias;

    public int NumeroDeAulas;

    public int AutorId;

    @JsonProperty("data")
    public String DataDePublicacao;
}

