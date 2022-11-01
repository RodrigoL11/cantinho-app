import styled from 'styled-components/native'

interface IStatus {
    bgColor: string
}

interface IButton {
    bgColor: string
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Content = styled.View`
    margin: 15px;
    background-color: #fff;
    border-radius: 7px;
`

export const Title = styled.Text`
    font-size: 20px;
    color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.medium};
    padding: 10px 15px;
`

export const Card = styled.View`
    border-top-width: 0.5px;
    border-color: #656565;
    margin-bottom: 8px;
    padding: 10px 15px;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const DateContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

export const HighLabel = styled.Text`
    color: ${({theme}) => theme.colors.text_color[900]};
    font-family: ${({theme}) => theme.fonts.medium};
`

export const Label = styled.Text`
    color: ${({theme}) => theme.colors.text_color[600]};
    font-family: ${({theme}) => theme.fonts.regular};
`

export const Status = styled.View<IStatus>`
    background-color: ${(props) => props.bgColor};
    padding: 0px 10px;
    border-radius: 7px;
    align-self: flex-start;
    height: 23px;
    align-items: center;
    justify-content: center;    
`

export const StatusLabel = styled.Text`
    color: #fff;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: 11px;
`

export const Items = styled.View`
    margin-top: 8px;
`

export const Item = styled.View`
    margin-bottom: 4px;
`

export const ItemsTitle = styled.Text`
    margin-bottom: 6px;
    font-size: 15px;
    color: ${({theme}) => theme.colors.text_color};
    font-family: ${({theme}) => theme.fonts.medium};
    margin-top: 4px;
`

export const ItemLabel = styled.Text`
    letter-spacing: 0.5px;
    color: ${({theme}) => theme.colors.text_color};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 12px;
`

export const CategoryLabel = styled.Text`
    margin-left: 3px;
    color: ${({theme}) => theme.colors.text_color};
    font-family: ${({theme}) => theme.fonts.light};
    font-size: 10.5px;
`

export const Buttons = styled.View`
    flex-direction: row;
    margin-top: 8px;
    align-items: center;
`

export const Button = styled.TouchableOpacity<IButton>`
    background-color: ${(props) => props.bgColor};
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    height: 28px;
    border-radius: 7px;
    margin-right: 8px;
`

export const ButtonLabel = styled.Text`
    font-size: 12px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: #fff;
`