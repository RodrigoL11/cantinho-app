import styled from 'styled-components/native'
interface InputProps{
    size?: number;
}

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    align-items: center;
    position: absolute;
`

export const Background = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Card = styled.View`
    width: 95%;
    height: 220px;
    background-color: ${({theme}) => theme.colors.bgCard};
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    padding: 20px 20px 0px 20px;
    justify-content: space-between;
`

export const Label = styled.Text`
    color: ${({theme}) => theme.colors.text_color[900]};
    font-family: ${({theme}) => theme.fonts.semiBold};
`

export const Column = styled.View<InputProps>`
    width: ${(props) => props.size}%;
`

export const Row = styled.View`    
    flex-direction: row;
    width: 100%;
    justify-content: space-between;    
`

export const Input = styled.TextInput`
    color: ${({theme}) => theme.colors.text_color[700]};
    font-family: ${({theme}) => theme.fonts.regular};
    height: 32px;
    border-bottom-width: 1px;
    border-color: #dadada;
    width: 100%;
`

export const Title = styled.Text`
    font-size: 23px;
    color: ${({theme}) => theme.colors.text_color[900]};
    font-family: ${({theme}) => theme.fonts.bold};
    text-align: center;    
`

export const ErrorMessage = styled.Text`
    color: #B00020;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 10.5px;
    letter-spacing: 0.5px;
`