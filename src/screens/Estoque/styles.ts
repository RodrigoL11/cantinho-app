import styled, { css } from 'styled-components/native'

interface IAmount {
    type: string
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.View`
    margin: 5px 15px 15px 15px;
`

export const Card = styled.View`
    padding: 10px 15px;
    background-color: ${({theme}) => theme.colors.bgCard};
`

export const Separator = styled.View`
    width: 100%;
    height: 1px;
    background-color: #dadada;
    top: 10px;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Column = styled.View`

`

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.semiBold};
    font-size: 16px;
    color: ${({theme}) => theme.colors.text_color[900]};
    margin-bottom: 4px;
`

export const ValueLabel = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_color[600]};
    font-size: 11.5px;
    line-height: 20px;
`

export const Value = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.text_color[800]};
    font-size: 13px;
    line-height: 20px;
`

export const Amount = styled.Text<IAmount>`
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: 13px;
    margin-left: 0px;
    width: 35px;    

    ${(props) =>
        props.type === 'E' 
        ? css`
            color: #458F5A;
        `
        : css `
            color: #EC4F3C;
        `
    }
`