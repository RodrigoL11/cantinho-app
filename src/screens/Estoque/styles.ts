import styled, { css } from 'styled-components/native'

interface IAmount {
    type: string
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.ScrollView`
    padding: 5px 15px 15px 15px;
`

export const Card = styled.View`
    padding: 12px 16px;
    background-color: ${({theme}) => theme.colors.bgCard};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.semiBold};
    font-size: 15px;
    color: ${({theme}) => theme.colors.text_color[800]};
`

export const Label = styled.Text`
    font-family: ${({theme}) => theme.fonts.light};
    color: ${({theme}) => theme.colors.text_color[600]};
    font-size: 11px;
    line-height: 14px;
`

export const StrongLabel = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_color[900]};
    font-size: 12px;
    line-height: 14px;
`

export const Amount = styled.Text<IAmount>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: 12.5px;
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