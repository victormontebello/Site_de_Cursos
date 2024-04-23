package org.ufg.Domain.Models;
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

    @MongoId
    public String Id;

    @NotBlank(message = "O nome não pode ser vazio")
    @Size(min = 2, max = 100, message = "o nome deve ter no mínimo 2 e no máximo 100 caracteres")
    public String Nome;

    @NotBlank(message = "Descricao não pode ser vazio")
    public String Descricao;

    @Positive(message = "O curso deve ter no mínimo 1 hora de duração")
    public double Horas;

    @Nullable
    public double Valor;

    @Nullable
    public boolean PossuiCertificado;

    @NotNull(message = "Status não pode ser indefinido")
    public StatusEnum Status;

    @NotEmpty(message = "Categorias não pode ser vazio")
    public ArrayList<CategoriaEnum> Categorias;

    @Min(value = 1, message = "o curso deve ter no mínimo 1 aula")
    public int NumeroDeAulas;

    @NotNull(message = "o curso deve ter um autor definido")
    public Autor Autor;

    public LocalDateTime DataDePublicacao;
}

