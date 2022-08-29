import styled from 'styled-components/native';
import { FontAwesome  } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
    width: 80%;
    margin-bottom: 10px;
`

export const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: lightgray;
    height: 56px;
    padding-left: 25px;
    padding-right: 18px;
`

export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: gray;
`

export const Icon = styled(FontAwesome)`
    
`

export const Menu = styled.View`
    background-color: #ddd;
    padding: 20px 14px 0 14px;
`