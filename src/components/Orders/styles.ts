import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #fff;
  width: 90%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 14px;
`

export const Title = styled.Text`
  margin-bottom: 8px;
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text_color};
  border-bottom-width: 1px;
  border-color: #333;
  padding-bottom: 5px;
`

export const OrderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0;
`

export const Row = styled.View`
  flex-direction: row;
`

export const Column = styled.View`

`

export const Name = styled.Text`
  color: #66646b;
  font-family: ${({theme}) => theme.fonts.medium};
  line-height: 20px;
  font-size: 13px;
`

export const Value = styled.Text`
  color: #66646b;
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 13px;
`

export const Category = styled.Text`
  color: #7a7a80;
  font-size: 10.5px;
  line-height: 20px;
  font-family: ${({theme}) => theme.fonts.regular};
`

export const Quantity = styled.Text`
  top: -2px;
  color: #66646b;
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 10px;

`

export const TotalContainer = styled.View`
  border-top-width: 1px;
  border-color: #333;
  padding-top: 5px;
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`

export const Total = styled.Text`
  font-size: 16px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.text_color};
`

export const Empty = styled.Text`
  margin: 15px 0px;
  color: #66646b;
  font-size: 14px;
  font-family: ${({theme}) => theme.fonts.medium};
  text-align: center;
`