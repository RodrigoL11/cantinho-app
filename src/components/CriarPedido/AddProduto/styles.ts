import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    align-items: center;
    position: absolute;
`

export const Background = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Card = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.bgCard};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.bold}; 
  margin-bottom: 20px;
`

export const Name = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.medium}; 
`

export const Price = styled.Text`
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 16px;
  margin-bottom: 20px;
`

export const Stock = styled.Text`
  font-size: 11px;
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.light};
  margin-bottom: 10px;
`

export const Row = styled.View`    
    flex-direction: row;
    justify-content: space-between;    
`

export const Column = styled.View`

`

export const QuantityContainer = styled.View`
  flex-direction: row;
`

export const QuantityButton = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary_color};
`

export const AddButton = styled.TouchableOpacity`
  padding: 0px 8px;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.primary_color};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
`

export const AddButtonLabel = styled.Text`
  color: #fff;
  margin: 0px 7px;
  font-family: ${({theme}) => theme.fonts.medium};
`

export const Quantity = styled.TextInput`
  margin: 0px 8px;
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.medium};
  text-align: center;
`