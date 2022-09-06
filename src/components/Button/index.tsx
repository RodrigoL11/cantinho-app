import React from 'react';

import { 
    Container,
    Title
 } from './styles'

interface Props{
    title: string;
    onPress: () => void;
}

export default function Button({title, onPress}: Props){
    return(
        <Container activeOpacity={0.55} onPress={onPress}>
            <Title>{title}</Title>
        </Container>
    );
}