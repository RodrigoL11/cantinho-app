import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 40px;
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.bold};
  margin-bottom: 44px;
`;

