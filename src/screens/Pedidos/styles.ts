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
    color: #656565;
    padding: 10px 15px;
    font-weight: 500;
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

export const Label = styled.Text`

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
    font-weight: 500;
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
    color: #656565;
    font-weight: 500;
    margin-top: 4px;
`

export const ItemLabel = styled.Text`
    letter-spacing: 0.5px;
    font-weight: 400;
    font-size: 12px;
`

export const CategoryLabel = styled.Text`
    margin-left: 3px;
    font-weight: 300;
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
    font-weight: bold;
    color: #fff;
`