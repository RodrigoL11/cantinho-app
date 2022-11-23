import React from "react";
import { TextInputProps, TouchableWithoutFeedback } from 'react-native';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Container,
  IconContainer,
  InputText,
} from "./styles";

import { themes, useTheme } from "@hooks/theme";

type Props = TextInputProps & {
  value?: string
  hideIcon?: boolean
};

export default function SearchInput({ value, hideIcon, ...rest }: Props) {  
  const { theme } = useTheme();
  const color = themes[theme].colors.text_color[500];

  return (
    <Container>
      {!hideIcon ?
        <IconContainer>
          <Feather
            name="search"
            size={22}
            color={color}
          />
        </IconContainer>
        : null}

      <InputText
        {...rest}
        value={value}
        placeholderTextColor={color}        
      />

    </Container>
  );
}
