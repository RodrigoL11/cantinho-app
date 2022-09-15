import styled from "styled-components/native";

interface InputProps{
  size?: number;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background };
  padding: 20px;
  margin-top: 32px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Column = styled.View<InputProps>`
  width: ${(props) => props.size || 100}%;
`

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.title_color};
  margin-top: 44px;
  margin-bottom: 44px;
`;

export const Section = styled.Text`
  font-size: 14px;
  height: 32px;
  border-bottom-width: 1.5px;
  color: #7A7A80;
  border-color: #adadaa;
  line-height: 25px;
  margin-bottom: 14px;
  margin-top: 8px;
`
