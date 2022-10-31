import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Row = styled.View`
  flex-direction: row;
`

export const CategoriesContainer = styled.ScrollView`
  padding: 0px 15px;
  background-color: #fff;
  min-height: 50px;
`

export const Content = styled.ScrollView`
  
`

export const Section = styled.View`
  
`

export const ProductSeparator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: #dadada;
  top: 8px;
`

export const CategoryLabel = styled.Text`
  padding: 15px;
  font-weight: bold;  
  font-size: 12px;
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

export const CartContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 0px 15px;
  height: 48px;
  background-color: ${({theme}) => theme.colors.primary_color};
  justify-content: space-between;
  align-items: center;
`

export const CartIcon = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CartItemsQuantityContainer = styled.View`
  height: 14px;
  width: 14px;
  margin-left: 8px;
  background-color: #fff;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
`

export const CartItemsQuantityLabel = styled.Text`
  font-size: 9px;
  font-weight: 700;
`

export const CartTitle = styled.Text`
  color: #fff;
`

export const CartTotal = styled.Text`
  color: #fff;
`