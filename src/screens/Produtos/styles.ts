import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.ScrollView`
    
`

export const Card = styled.View`
    flex-direction: row;
    background-color: #fff;
    padding: 5px 15px;
    justify-content: space-between;
    align-items: center;
`

export const Name = styled.Text`
    color: ${({theme}) => theme.colors.primary_color};
    font-family: ${({theme}) => theme.fonts.semiBold};
    line-height: 20px;
    margin-right: 2px;
`

export const Category = styled.Text`
    color: ${({theme}) => theme.colors.text_color[600]};
    font-family: ${({theme}) => theme.fonts.light};
    font-size: 10.5px;
    letter-spacing: 0.5px;
    line-height: 20px;
`

export const Label = styled.Text`
    color: ${({theme}) => theme.colors.text_color[800]};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 12px;   
`

export const Row = styled.View`
    flex-direction: row;
`

export const Column = styled.View`

`