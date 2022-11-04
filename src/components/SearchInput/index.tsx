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
  filterIcon?: boolean
  onPress?: () => void
};

export default function SearchInput({ value, filterIcon, onPress, ...rest }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Feather
          name="search"
          size={22}
          color={theme.colors.text_color[600]}
        />
      </IconContainer>

      <InputText
        {...rest}
        value={value}
      />

      {filterIcon &&
      <TouchableWithoutFeedback onPress={onPress}>
      <IconContainer>
        <MaterialCommunityIcons
        name="tune"
        size={24}
        color={theme.colors.text_color[600]}
      />
      </IconContainer>
      </TouchableWithoutFeedback>
      }
    </Container>
  );
}
