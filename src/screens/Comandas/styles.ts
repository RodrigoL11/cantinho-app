import styled, { css } from 'styled-components/native'

interface ICard {
  hasPedidos: boolean
  status: string
}

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Card = styled.TouchableOpacity<ICard>`
  border-width: 1px;
  border-color: transparent;
  height: 100px;
  justify-content: space-between;
  padding: 2px 4px;

  ${(props) =>
    props.status === "I"
      ? css`
        background-color: #FF8A80;
        border-color: #F44336;
    ` : props.status === "F"
        ? css`
    background-color: #B9F6CA;
    border-color: #00E676;
    ` : css`
    background-color: ${({ theme }) => theme.colors.bgCard};
    `
  }

  ${(props) =>
    props.hasPedidos
    && css`
      border-color: ${({ theme }) => theme.colors.primary_color};
    `
  };
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const DateLabel = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text_color[600]};
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Nome = styled.Text`
  text-align: center;
  top: -4px;
  color: ${({ theme }) => theme.colors.text_color[800]};
  font-family: ${({ theme }) => theme.fonts.medium};
`

export const Mesa = styled.Text`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text_color[700]};
  font-family: ${({ theme }) => theme.fonts.medium};
`

export const Aviso = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary_color};
  padding: 3.5px 7px;
  border-top-left-radius: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
`

export const AvisoLabel = styled.Text`
  color: #fff;
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const OptionContainer = styled.View`
  align-items: center;
  flex-direction: row;
`

export const OptionLabel = styled.Text`
  margin-left: 7px;
  line-height: 18px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text_color[800]};
  font-family: ${({ theme }) => theme.fonts.light};
`

export const BackToTopButton = styled.TouchableOpacity`
    height: 44px;
    width: 44px;
    border-radius: 999px;
    background-color: ${({theme}) => theme.colors.primary_color};
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 30px;
    right: 30px;
`