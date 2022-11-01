import { Feather } from "@expo/vector-icons";
import { MaskInputProps } from 'react-native-mask-input';
import React, { useState } from "react";

import {
  Container,
  IconContainer,
  InputText,
  SecurityContainer,
} from "./styles";

export type InputProps = MaskInputProps & {
  icon?: keyof typeof Feather.glyphMap;
  value?: string;
  type?: string;
  isVisible?: boolean;
  setVisible?: (e: any) => void;
};

export default function Input({ icon, value, type, isVisible, setVisible, ...rest }: InputProps) {
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
      {icon ? (<IconContainer isFocused={isFocused}>
        <Feather
          name={icon}
          size={24}
          color={isFocused || isFilled ? "#DC1637" : "#AEAEB3"}
        />
      </IconContainer>) : null}

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        value={value}
        {...rest}
      />

      {(type === "password" && setVisible) ? (
        <SecurityContainer
          activeOpacity={1}
          isFocused={isFocused}
          onPress={() => setVisible(!isVisible)}
        >
          <Feather
            name={isVisible ? "eye" : "eye-off"}
            size={24}
            color={"#AEAEB3"}
          />
        </SecurityContainer>
      ) : null}
    </Container>
  );
}
