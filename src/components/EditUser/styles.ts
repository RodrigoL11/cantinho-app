import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    padding: 0 10px;
    position: absolute;
    justify-content: flex-end;
`

export const Content = styled.View`
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 15px 20px;
    height: 250px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.bgCard};
    justify-content: space-between;
`

export const Title = styled.Text`
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
    color: ${({theme}) => theme.colors.text_color[900]};
    font-family: ${({theme}) => theme.fonts.medium};
`

export const ErrorMessage = styled.Text`
    color: #B00020;
    font-family: ${({theme}) => theme.fonts.semiBold};
    font-size: 10.5px;
    top: -5px;
    letter-spacing: 0.5px;
`