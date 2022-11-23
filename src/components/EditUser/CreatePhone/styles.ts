import styled from 'styled-components/native'
import MaskedInput from 'react-native-mask-input'

interface IColumn{
  width: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.View`
  padding: 15px 0;
`

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const Column = styled.View<IColumn>`
  min-width: ${(props) => props.width}%;
  background-color: ${({theme}) => theme.colors.bgCard};
  padding: 5px 0;
`

export const Input = styled(MaskedInput)`
  height: 37px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.regular};
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const Label = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.regular};
  margin-bottom: 4px;
  margin-left: 10px;
`

export const ErrorMessage = styled.Text`
  width: 100%;
  padding: 8px;
  background-color: ${({theme}) => theme.title === 'dark' ? "#b70000" : "#fce6e5"};
  color: ${({theme}) => theme.title === 'dark' ? "#fff" : "#ee6d66"};
  font-family: ${({theme}) => theme.fonts.semiBold};  
  font-size: 12px;
`