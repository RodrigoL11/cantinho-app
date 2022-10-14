import { ICategories } from '@interfaces/main';
import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import React, { useEffect, useState } from 'react';

import {
    Container,
    Content
} from './styles'

export default function Categorias(){
    const [categories, setCategories] = useState<ICategories[]>([]);
    const navigation = useNavigation(); 

    const loadData = async () => {
        try {
            const reponse = await api.get(`produtos`);
            const { results } = reponse.data;
            setCategories(results);            
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        loadData();
        navigation.setOptions({
            title: `Categorias (${categories.length})`
        })
    }, [])

    
    return(
        <Container>
            <Content>
                
            </Content>
        </Container>
    )
}