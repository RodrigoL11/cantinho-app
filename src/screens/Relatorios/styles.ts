import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.ScrollView`
    padding: 0 15px;
`

export const Title = styled.Text`
    padding: 0 15px;
    margin-top: 15px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 20px;
    color: ${({theme}) => theme.colors.text_color[800]};
`

export const ProfitTotal = styled.Text`
    top: -10px;
    font-family: ${({theme}) => theme.fonts.semiBold};
    font-size: 44px;
    color: ${({theme}) => theme.colors.text_color[800]};
    
    padding: 0 15px;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Card = styled.View`
    background-color: ${({theme}) => theme.colors.bgCard};
    padding: 10px 16px;
    border-top-width: 1px;
    border-color: #dadada;
`

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    letter-spacing: 0.5px;
    padding-left: 15px;
    font-size: 12px;
    color: ${({theme}) => theme.colors.text_color[800]};
`

export const Label = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 13px;
    color: ${({theme}) => theme.colors.text_color[700]};
`

export const StrongLabel = styled.Text`
    font-family: ${({theme}) => theme.fonts.semiBold};
    font-size: 13px;
    color: ${({theme}) => theme.colors.text_color[700]};
`