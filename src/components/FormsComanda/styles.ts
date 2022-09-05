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
    background-color: #fff;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    align-items: center;
    padding: 20px;
    
`

export const Label = styled.Text`
    color: #000;
    text-align: left;
`

export const Column = styled.View<InputProps>`
    width: ${(props) => props.size}%;
`

export const Row = styled.View`
    margin-top: 18px;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`

export const Input = styled.TextInput`
    height: 32px;
    border-bottom-width: 1px;
    border-color: #dadada;
    width: 100%;
`

export const Title = styled.Text`
    font-size: 23px;
    font-weight: bold;
`

export const ButtonContainer = styled.TouchableOpacity`
    width: 80%;
    height: 42px;
    background-color: #dadada;
    align-items: center;
    justify-content: center;
    margin-top: 28px;
`

export const ButtonTitle = styled.Text`
    color: #fff;
    font-weight: bold;
`