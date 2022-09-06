import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TitleContainer = styled.View`
  width: 90%;
  margin-top: 50px;
  margin-bottom: 20px;
`

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  text-align: left;
`;

export const Input = styled.TextInput`
  width: 90%;
  padding: 10px;
  background-color: #fff;
  color: #424242;
  margin-bottom: 30px;
  border-radius: 7px;
`;

export const InputContainer = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 7px;
`;

export const InputPassword = styled.TextInput`
  flex: 1;
  padding: 10px;
  background-color: #fff;
  color: #424242;
  border-radius: 7px;
`;

