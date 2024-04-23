package org.ufg.Domain.Models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.ufg.Domain.Enums.CategoriaEnum;
import org.ufg.Domain.Enums.StatusEnum;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Curso {
    @MongoId
    public String Id;
    public String Nome;
    public String Descricao;
    public double Horas;
    public double Valor;
    public boolean PossuiCertificado;
    public StatusEnum Status;
    public ArrayList<CategoriaEnum> Categorias;
    public int NumeroDeAulas;
    public Autor Autor;
    public LocalDateTime DataDePublicacao;
}
