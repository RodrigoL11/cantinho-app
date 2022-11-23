import styled from 'styled-components/native'
import { StatusBar } from 'react-native';

export const Container = styled.View`
    width: 100%;
    height: ${58 + (StatusBar.currentHeight || 0)}px;
    padding-top: ${StatusBar.currentHeight}px;
    background-color: ${({theme}) => theme.colors.bgCard};
    box-shadow: 10px 5px 5px black;
    justify-content: space-between;
    flex-direction: row;
`

export const Row = styled.View`
    flex-direction: row;
    padding: 16px;
`

export const Icon = styled.TouchableOpacity`
    height: 36px;
    width: 24px;
    align-self: center;
    align-items: center;
    justify-content: center;
    top: 1px;
`

export const Title = styled.Text`
    margin-left: 32px;
    font-family: ${({theme}) => theme.fonts.semiBold};
    color: ${({theme}) => theme.colors.text_color[700]};
    font-size: 18px;
`
