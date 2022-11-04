import styled, { css } from 'styled-components/native'

interface ICard{
  hasPedidos: boolean
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Card = styled.TouchableOpacity<ICard>`
  border-width: 1px;
  border-color: transparent;
  height: 100px;
  background-color: ${({theme}) => theme.colors.bgCard};
  justify-content: space-between;
  padding: 2px 4px;

  ${(props) => 
    props.hasPedidos 
    && css`
      border-color: ${({theme}) => theme.colors.primary_color};
    `
  };
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Id = styled.Text`
  font-size: 10px;
  color: ${({theme}) => theme.colors.text_color[600]};
  font-family: ${({theme}) => theme.fonts.light};
`

export const Nome = styled.Text`
  text-align: center;
  top: -4px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.medium};
`

export const Mesa = styled.Text`
  font-size: 11px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.medium};
`

export const Aviso = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.primary_color};
  padding: 3.5px 7px;
  border-top-left-radius: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
`

export const AvisoLabel = styled.Text`
  color: #fff;
  font-size: 10px;
  font-family: ${({theme}) => theme.fonts.bold};
`

export const OptionContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

export const OptionLabel = styled.Text`
  margin-left: 7px;
  line-height: 18px;
  font-size: 13px;
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.light};
`

