import styled from 'styled-components/native'
import { StatusBar } from 'react-native';

export const Container = styled.View`
    width: 100%;
    height: ${56 + (StatusBar.currentHeight || 0)}px;
    padding-top: ${StatusBar.currentHeight}px;
    background-color: ${({theme}) => theme.colors.bgCard};
    box-shadow: 10px 5px 5px black;
    justify-content: space-between;
`

export const Row = styled.View`
    flex-direction: row;
    padding: 16px;
`

export const Icon = styled.TouchableOpacity`
`

export const Title = styled.Text`
    margin-left: 32px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.text_color};
    font-size: 18px;
`
