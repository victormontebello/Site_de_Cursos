package org.ufg.Domain.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.MongoId;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pacote extends Curso{

    @MongoId
    @JsonProperty("_id")
    private ObjectId Id;

    @NotNull
    @JsonProperty("cursos")
    private ArrayList<Curso> Cursos;

    private double Desconto;

    public double ValorFinal(){
        return this.Valor * this.Desconto / 100;
    }
}
