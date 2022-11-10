import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 22px;
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.semiBold};
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 0.7px;
`

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.light};
  text-align: center;
`