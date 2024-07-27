package org.ufg.Domain.Enums;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = StatusEnumDeserializer.class)
public enum StatusEnum {
    ATIVO,
    INATIVO,
    EM_ANDAMENTO,
    CONCLUIDO
}



