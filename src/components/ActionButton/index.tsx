import React from 'react'

import { Ionicons } from '@expo/vector-icons';

import {
    Container
} from './styles'

interface Props{
    name: string;
    size: number;
}

export default function ActionButton({ name, size }: Props){
    const icon = name as keyof typeof Ionicons.glyphMap;

    return (
        <Container>
            <Ionicons name={icon} size={size} color="#fff" />
        </Container>
    );
}