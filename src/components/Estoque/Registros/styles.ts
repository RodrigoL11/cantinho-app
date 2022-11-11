import styled from "styled-components/native";

interface ICard {
  tipo: string
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Title = styled.Text`
  font-size: 26px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text_color[800]};
  margin-top: 20px;
  padding: 0 15px;
`

export const Content = styled.ScrollView`
  
`

export const Card = styled.View<ICard>`
  flex-direction: row;
  padding: 6px 16px;
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const IconContainer = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 999px;
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
`

export const DateLabel = styled.Text`


  color: ${({theme}) => theme.colors.text_color[600]};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 12px;
`

export const QuantityLabel = styled.Text`
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.bold};
`

export const ValueLabel = styled.Text`
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.medium};
`
