import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Card = styled.TouchableOpacity`
  border-width: 1px;
  border-color: transparent;
  height: 100px;
  background-color: #fff;
  justify-content: space-between;
  padding: 2px 4px;
`

export const InputContainer = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: center;
`

export const Input = styled.TextInput`
  font-size: 18px;
  height: 44px;
  border-bottom-width: 1px;
  border-color: #999;
  color: #666;
  width: 95%;
  padding-left: 2px;
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
  top: -4px;
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

export const OptionContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

export const OptionLabel = styled.Text`
  margin-left: 7px;
  line-height: 18px;
  font-size: 13px;
  font-weight: 300;
`

