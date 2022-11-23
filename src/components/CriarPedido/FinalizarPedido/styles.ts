import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1 ;
  background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.View`
  padding: 15px;
  margin: 30px 0;
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const Footer = styled.View`
  padding: 15px;
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary_color};
  flex-direction: row;
  height: 42px;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
`

export const ButtonTitle = styled.Text`
  color: #fff;
  font-family: ${({theme}) => theme.fonts.regular};
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Column = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Label = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[900]};
  font-family: ${({theme}) => theme.fonts.semiBold};
`

export const Card = styled.View`
  margin: 5px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Separator = styled.View`
  height: 0.6px;
  background-color: ${({theme}) => theme.colors.border_color};
  width: 100%;
`

export const Text = styled.Text`
  font-size: 11px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.regular};
`

export const TotalLabel = styled.Text`
  font-size: 17px;
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.bold};
`

export const Total = styled.Text`
  font-size: 17px;
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.bold};
`

export const AddButtonContainer = styled.TouchableOpacity`
  border-color: ${({ theme }) => theme.colors.primary_color};
  border-width: 1px;
  border-radius: 7px;
  height: 44px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 25px;
`

export const AddButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary_color};
  font-family: ${({theme}) => theme.fonts.regular};
`
