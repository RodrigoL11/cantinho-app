import styled from 'styled-components/native'

interface Props{
  reverse?: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
    width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (props) => props.reverse ? theme.colors.button_color : theme.colors.button_bg};
  margin-bottom: 8px;
`

export const Title = styled.Text<Props>`
    font-size: 15px;
  color: ${({ theme }) => (props) => props.reverse ?  theme.colors.button_bg : theme.colors.button_color};
`