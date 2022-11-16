import styled from 'styled-components/native'
import CurrencyInput from 'react-native-currency-input';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.View`
  padding: 15px;
`

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[600]};
  margin-bottom: 6px;
`

export const Card = styled.View`
  background-color: ${({theme}) => theme.colors.bgCard};
  padding: 10px 16px;
  margin-bottom: 15px;
`

export const PaymentLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 13px;
  color: ${({theme}) => theme.colors.text_color[800]};
`

export const Input = styled(CurrencyInput)`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[800]};
`

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[700]};
`

export const TotalLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 16px;
  color: ${({theme}) => theme.colors.text_color[800]};
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center; 
`

export const SpacedRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;  
`

export const Icon = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`

export const Separator = styled.View`
  margin: 6px 0px;
  height: 0.5px;
  width: 100%;
  background-color: #dadada;
`

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`