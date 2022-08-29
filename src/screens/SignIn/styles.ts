import styled from 'styled-components/native'

export const Title = styled.Text`
    font-size: 24px;
    margin-bottom: 45px;
    color: #fff;
`

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.background};
`

export const Input = styled.TextInput`
    width: 70%;
    padding: 10px;
    background-color: #fff;
    color: #424242;
    margin-bottom: 30px;
    border-radius: 10px;
`

export const InputContainer = styled.View`
    width: 70%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-bottom: 30px;
    border-radius: 10px;
`

export const InputPassword = styled.TextInput`
    flex: 1;
    padding: 10px;
    background-color: #fff;
    color: #424242;
    border-radius: 10px;
`

export const Footer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export const SubTitle = styled.Text`
    font-size: 15px;
    color: #fff;
`

export const LinkText = styled.Text`
    color: ${({theme}) => theme.colors.color_button};
    font-size: 16px;
    font-weight: bold;
`
