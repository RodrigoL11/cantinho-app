import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.button_bg};
  margin-bottom: 8px;
`

export const Title = styled.Text`
    font-size: 15px;
  color: ${({ theme }) => theme.colors.button_color};
`