package org.ufg.Domain.Enums;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class CategoriaEnumDeserializer extends JsonDeserializer<CategoriaEnum> {
    @Override
    public CategoriaEnum deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String value = jsonParser.getValueAsString();
        return CategoriaEnum.valueOf(value);
    }
}
