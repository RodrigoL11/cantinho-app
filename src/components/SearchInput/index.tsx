import React from "react";
import { TextInputProps, TouchableWithoutFeedback } from 'react-native';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Container,
  IconContainer,
  InputText,
} from "./styles";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  value?: string
  hideIcon?: boolean
};

export default function SearchInput({ value, hideIcon, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      {!hideIcon ?
        <IconContainer>
          <Feather
            name="search"
            size={22}
            color={theme.colors.text_color[600]}
          />
        </IconContainer>
        : null}

      <InputText
        {...rest}
        value={value}
      />

    </Container>
  );
}
