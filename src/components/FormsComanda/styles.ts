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
    background-color: ${({theme}) => theme.colors.background};
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    padding: 20px 20px 10px 20px;
    justify-content: space-between;
`

export const Column = styled.View<InputProps>`
    width: ${(props) => props.size}%;
`

export const Row = styled.View`    
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;    
`

export const Title = styled.Text`
    font-size: 23px;
    color: ${({theme}) => theme.colors.text_color[900]};
    font-family: ${({theme}) => theme.fonts.bold};
    margin-bottom: 20px;   
`

export const ErrorMessage = styled.Text`
    color: #B00020;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 10.5px;
    letter-spacing: 0.5px;
    top: -23px;
`