import styled from 'styled-components/native'

interface IStatus {
    bgColor: string
}

interface IButton {
    bgColor: string
}

interface ICard{
    isFirst: boolean
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Content = styled.View`
    margin: 5px 15px 15px 15px;
    background-color: #fff;
    border-radius: 7px;
`

export const Card = styled.View<ICard>`
    border-top-width: ${({isFirst}) => isFirst ? 0 : 0.5}px;
    border-color: #ccc;
    padding: 10px 15px;
`

export const SpacedRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
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
    flex: 1;
    text-align: left;
`

export const Status = styled.View<IStatus>`
    background-color: ${(props) => props.bgColor};
    padding: 0px 10px;
    border-radius: 7px;
    align-self: flex-end;
    height: 23px;
    align-items: center;
    justify-content: center;
    margin-left: 16px;    
`

export const StatusLabel = styled.Text`
    color: #fff;
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: 11px;
`

export const Items = styled.View`
    margin-top: 16px;
`

export const Item = styled.View`
    margin-bottom: 4px;
`

export const ItemsTitle = styled.Text`
    margin: 4px 0;
    font-size: 15px;
    color: ${({theme}) => theme.colors.text_color[900]};
    font-family: ${({theme}) => theme.fonts.medium};
`

export const ItemLabel = styled.Text`
    letter-spacing: 0.5px;
    color: ${({theme}) => theme.colors.text_color[700]};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 12px;
`

export const CategoryLabel = styled.Text`
    margin-left: 3px;
    color: ${({theme}) => theme.colors.text_color[700]};
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

export const ListLoading = styled.View`
    padding: 10px;
`

export const BackToTopButton = styled.TouchableOpacity`
    height: 44px;
    width: 44px;
    border-radius: 999px;
    background-color: ${({theme}) => theme.colors.primary_color}bb;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 30px;
    right: 30px;
`