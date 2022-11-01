import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import {
  Container,
  Icon,
  Row,
  Title
} from './styles'
import { useTheme } from 'styled-components';

interface Props {
  title: string;
  onPress?: () => void;
  extraIconName?: keyof typeof Ionicons.glyphMap;
  extraOnPress?: () => void;
}

export default function Header({ title, onPress, extraIconName, extraOnPress }: Props) {
  const theme = useTheme();

  return (
    <Container style={Platform.OS === 'ios' ? styles.boxShadowiOS : styles.boxShadowAndroid}>
      <Row>
        <TouchableWithoutFeedback onPress={onPress}>
          <Icon>
            <Ionicons name="ios-arrow-back-outline" onPress={onPress} size={24} color={theme.colors.text_color} />
          </Icon>
        </TouchableWithoutFeedback>
        <Title>{title}</Title>
      </Row>
      {extraIconName &&
        <Icon>
          <Ionicons name={extraIconName} onPress={extraOnPress} size={24} color={theme.colors.text_color} />
        </Icon>
      }
    </Container>
  );
}

const styles = StyleSheet.create({
  boxShadowiOS: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  boxShadowAndroid: {
    elevation: 10,
    shadowColor: '#171717',
  }
})