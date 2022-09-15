import React from 'react'

import { Feather } from '@expo/vector-icons';

import {
    Container,
    Icon,
    Title
} from './styles'

interface Props{
    title: string;
    onPress?: () => void;
}

export default function Header({ title, onPress }:Props){
    return(
        <Container>
            <Icon onPress={onPress}>
                <Feather name="arrow-left" onPress={onPress} size={30} color="#000000" />
            </Icon>
            <Title>{title}</Title>
        </Container>
    );
}