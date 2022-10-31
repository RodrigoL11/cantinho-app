import React from 'react'

import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import {
  Container,
  ExtraIcon,
  Icon,
  Row,
  Title
} from './styles'

interface Props {
  title: string;
  onPress?: () => void;
  extraIconName?: keyof typeof Ionicons.glyphMap;
  extraOnPress?: () => void;
}

export default function Header({ title, onPress, extraIconName, extraOnPress }: Props) {
  return (
    <Container style={Platform.OS === 'ios' ? styles.boxShadowiOS : styles.boxShadowAndroid}>
      <Row>
        <TouchableWithoutFeedback style={{backgroundColor: 'red'}} onPress={onPress}>
          <Icon>
            <Ionicons name="ios-arrow-back-outline" onPress={onPress} size={25} color="#333" />
          </Icon>
        </TouchableWithoutFeedback>
        <Title>{title}</Title>
      </Row>
      {extraIconName &&
        <ExtraIcon>
          <Ionicons name={extraIconName} onPress={extraOnPress} size={25} color="#333" />
        </ExtraIcon>
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