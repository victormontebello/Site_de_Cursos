package org.ufg.Domain.Enums;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = CategoriaEnumDeserializer.class)
public enum CategoriaEnum {
    DESENVOLVIMENTO,
    DESIGN,
    MARKETING,
    FINANCAS,
    NEGOCIOS,
    SAUDE,
    ESPORTE,
    MUSICA,
    EDUCACAO,
    TECNOLOGIA,
    LINGUAS,
    HUMANAS,
    EXATAS,
    BIOLOGICAS,
    SOCIAIS
}
