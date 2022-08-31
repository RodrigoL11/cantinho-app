import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Card = styled.TouchableOpacity`
  
  border-width: 1px;
  border-color: transparent;
  height: 100px;
  background-color: #fff;
  justify-content: space-between;
  padding: 2px 4px;
`

export const Content = styled.View`
  flex: 1;
`

export const Input = styled.TextInput`

`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Id = styled.Text`
  font-size: 10px;
  color: #dadada;
`

export const Nome = styled.Text`
  text-align: center;
`

export const Valor = styled.Text`
  font-size: 11px;
`

export const Mesa = styled.Text`
  font-size: 11px;
`

export const Aviso = styled.View`
  align-items: center;
  justify-content: center;
  background-color: greenyellow;
  padding: 3.5px 7px;
  border-top-left-radius: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
`

export const AvisoLabel = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 10px;
`

