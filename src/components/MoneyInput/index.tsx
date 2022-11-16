import React, { useState } from 'react';
import { Container, PlaceholderLabel, LabeledInput } from './styles';
import { CurrencyInputProps } from 'react-native-currency-input';


interface InputProps extends CurrencyInputProps {
  placeholder: string;
  value: number;
  label: string;
}

const MoneyInput: React.FC<InputProps> = ({ value, placeholder, label, ...rest }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(value != 0 || false);
  
  value = value == null ? 0 : value

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      <PlaceholderLabel
        isFocused={isFocused}
        isFilled={isFilled}
        onPress={() => setIsFocused(!isFocused)}>
        {isFocused || isFilled ? label : placeholder}
      </PlaceholderLabel>
      <LabeledInput
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value > 0 || isFocused ? value : null}                
        {...rest} />
    </Container>
  );
}
export default MoneyInput;