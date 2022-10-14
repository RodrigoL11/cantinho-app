import React, { useState } from "react";
import { TextInputProps } from 'react-native';
import { Feather } from "@expo/vector-icons";

import {
  Container,
  IconContainer,
  InputText,
} from "./styles";

type Props = TextInputProps & {
  value?: string;
};

export default function SearchInput({ value, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name="search"
          size={22}
          color="#777777"
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}                
        value={value}
        {...rest}
      />

    </Container>
  );
}
