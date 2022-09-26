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
  justify-content: space-between;
  margin-bottom: 20px;

`

export const Column = styled.View<IColumn>`
  width: ${(props) => props.width}%;
  background-color: #fff;
  padding: 5px 0;
`

export const Input = styled(MaskedInput)`
  height: 40px;
  font-size: 15px;
`

export const Label = styled.Text`
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
  margin-left: 10px;
`