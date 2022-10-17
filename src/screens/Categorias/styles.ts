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
    padding: 8px 15px;
    justify-content: space-between;
    align-items: center;
`

export const Name = styled.Text`
    color: ${({theme}) => theme.colors.primary_color};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-right: 2px;
`

export const Label = styled.Text`
    color: #666;    
`

export const Row = styled.View`
    flex-direction: row;
`

export const Column = styled.View`

`