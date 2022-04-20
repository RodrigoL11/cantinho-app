import React from "react";
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Text } from "./style";

interface ButtonProps extends TouchableOpacityProps{
  title: string;
}

export default function BackButton({ title, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <MaterialIcons name="arrow-back" size={24} color="#fff" />
      <Text>{title}</Text>
    </Container>
  );
}
