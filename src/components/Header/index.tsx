import React from 'react'

import { Feather } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';

import {
    Container,
    Icon,
    Title
} from './styles'

interface Props {
    title: string;
    onPress?: () => void;
}

export default function Header({ title, onPress }: Props) {
    return (
        <Container style={Platform.OS === 'ios' ? styles.boxShadowiOS : styles.boxShadowAndroid}>
            <Icon onPress={onPress}>
                <Feather name="arrow-left" onPress={onPress} size={30} color="#000000" />
            </Icon>
            <Title>{title}</Title>
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