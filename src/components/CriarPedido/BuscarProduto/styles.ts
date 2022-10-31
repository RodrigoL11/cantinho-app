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
  background-color: #fff;
  padding: 8px 15px;
`

export const ProductName = styled.Text`
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 6px;
`

export const ProductPrice = styled.Text`
  font-weight: 400;
  font-size: 15px;
`

export const Content = styled.ScrollView`
  
`

export const Empty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const EmptyTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 0.7px;
`

export const EmptySubTitle = styled.Text`
  font-size: 14px;
  font-weight: 300;
  text-align: center;
`

export const Row = styled.View`
  flex-direction: row;
`

export const Stock = styled.Text`
  font-size: 12px;
  color: #aaa;
  line-height: 20px;
`

export const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: #dadada;
  top: 8px;
`