import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary_color};
  padding: 0px 12px;
  height: 28px;
  border-radius: 4px;
  margin: 10px 5px;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  color: #fff;
  font-size: 13px;
  font-family: ${({theme}) => theme.fonts.bold};
  text-align: center;
`