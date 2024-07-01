package org.ufg.Domain.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pacote extends Curso{

    @MongoId
    private String Id;
    private List<Curso> Cursos;
    private double Desconto;

    public double ValorFinal(){
        return this.Valor * this.Desconto / 100;
    }
}
