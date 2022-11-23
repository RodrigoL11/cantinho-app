import styled from 'styled-components/native'

interface CardProps{
    token?: string
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    padding: 20px;
`

export const IconContainer = styled.View`
    height: 36px;
    width: 36px;
    align-items: center;
    justify-content: center;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Title = styled.Text`
    line-height: 40px;
    font-size: 21px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.text_color[800]};
`

export const Name = styled.Text`
    font-size: 27px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: ${({theme}) => theme.colors.primary_color};
`

export const Emoji = styled.Text`
    font-size: 27px;
    margin-left: 6px;
    top: -2px;
`

export const SubTitle = styled.Text`
  font-size: 14px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_color[600]};
  margin-top: 5px;
  margin-bottom: 34px;
`

export const Content = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 2;
    justify-content: space-between;
`

export const Card = styled.TouchableOpacity<CardProps>`
    width: 44%;
    height: 30%;
    border-radius: 20px;
    background-color: ${(props) => props.token == "user" ? "#DC163755" : ({theme}) => theme.colors.primary_color};
    margin-bottom: 20px;
    justify-content: center;
`

export const CardIcon = styled.View`
    align-items: center;
    justify-content: center;
`

export const CardTitle = styled.Text`
    color: #fff;
    font-family: ${({theme}) => theme.fonts.semiBold};
    text-align: center;
    font-size: 21.5px;
    margin-top: 10px;
`