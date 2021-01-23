import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn, user } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().required('Password obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
        email: data.email,
        password: data.password
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro, verifique nome e password'
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />

          {/* Permite ter o comportamento correto ao mover o teclado */}
          <View>
            <Title>Log-in</Title>
          </View>

          <Form style={{ width: '100%' }} ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              name="email"
              icon="mail"
              placeholder="E-mail"
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
              name="password"
              icon="lock"
              placeholder="Password"
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>

          <ForgotPassword>
            <ForgotPasswordText>Recuperar Password</ForgotPasswordText>
          </ForgotPassword>
        </Container>

        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#FF9000" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
