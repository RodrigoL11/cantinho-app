import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import {
    Container
} from './styles'

interface Props{
    name: string;
    size: number;
    onPress: () => void;
}

export default function ActionButton({ name, size, onPress }: Props){
    const icon = name as keyof typeof Ionicons.glyphMap;

    return (
        <Container onPress={onPress}>
            <Ionicons name={icon} size={size} color="#fff" />
        </Container>
    );
}