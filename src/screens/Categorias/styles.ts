import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.ScrollView`
    
`

export const Card = styled.View`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.bgCard};
    padding: 8px 15px;
    justify-content: space-between;
    align-items: center;
`

export const Name = styled.Text`
    color: ${({theme}) => theme.colors.primary_color};
    font-family: ${({theme}) => theme.fonts.semiBold};
    line-height: 20px;
    margin-right: 2px;
`

export const Label = styled.Text`
    color: ${({theme}) => theme.colors.text_color};
    font-family: ${({theme}) => theme.fonts.regular};    
`

export const Row = styled.View`
    flex-direction: row;
`

export const Column = styled.View`

`