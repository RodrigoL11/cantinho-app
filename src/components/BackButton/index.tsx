import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

import { 
    Container,
    Text
 } from './styles'

interface Props{
    title: string;
    onPress: () => void;
}

export default function Button({title, onPress}: Props){
    return(
        <Container onPress={onPress}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
            <Text>{title}</Text>
        </Container>
    );
}