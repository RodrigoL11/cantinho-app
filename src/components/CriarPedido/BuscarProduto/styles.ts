import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`

export const ProductSeparator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: #dadada;
  top: 8px;
`

export const ProductContainer = styled.View`
  background-color: ${({theme}) => theme.colors.bgCard};
  padding: 8px 15px;
`

export const ProductName = styled.Text`
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.semiBold};
  font-size: 15px;
  margin-bottom: 4px;
`

export const ProductPrice = styled.Text`
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 15px;
`

export const Content = styled.ScrollView`
  
`

export const Row = styled.View`
  flex-direction: row;
`

export const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: #dadada;
  top: 8px;
`