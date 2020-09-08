import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Login</Title>
      <Input name="e-mail" icon="mail" placeholder="E-mail"/>
      <Input name="password" icon="mail" placeholder="Password"/>
      <Button>Picanha</Button>

    </Container>);
}

export default SignIn;
