package org.ufg.Domain.Models;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.mongodb.lang.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.ufg.Domain.Enums.CategoriaEnum;
import org.ufg.Domain.Enums.StatusEnum;
import org.ufg.Domain.Enums.StatusEnumDeserializer;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Curso {

    @MongoId
    @JsonProperty("_id")
    public ObjectId Id;

    @Nullable
    @JsonProperty("nome")
    public String Nome;

    @Nullable
    @JsonProperty("descricao")
    public String Descricao;

    @Nullable
    @JsonProperty("horas")
    public double Horas;

    @Nullable
    @JsonProperty("valor")
    public double Valor;

    @Nullable
    public boolean PossuiCertificado;

    @Nullable
    @JsonProperty("status")
    public StatusEnum Status;

    @Nullable
    @JsonProperty("categorias")
    public ArrayList<CategoriaEnum> Categorias;

    @Nullable
    public int NumeroDeAulas;

    @Nullable
    public int AutorId;

    @Nullable
    @JsonProperty("data")
    public String DataDePublicacao;
}

