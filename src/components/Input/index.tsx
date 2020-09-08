import React from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/feather'

import { Container, TextInput } from './styles';


interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>

    <Icon name="mail" size={20} color="#666360"/>s
      <TextInput
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default Input;
