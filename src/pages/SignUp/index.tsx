import React, { useRef, useCallback } from 'react';
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

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
    } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);


  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().min(6, 'Mín. 6 dígitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/users',data);

      Alert.alert('Registo realizado com sucesso!','Já pode fazer log-in')

      navigation.goBack();

    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert('Erro no registo!', 'Ocorreu um erro no registo');
    }
  }, []);


  return (
    <KeyboardAvoidingView
      style={{flex:1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}
      >
      <Container>
        <Image source={logoImg} />

        {/* Permite ter o comportamento correto ao mover o teclado */}
        <View>
          <Title>Criar conta</Title>
        </View>
        <Form
          ref={formRef}
          onSubmit={handleSignUp}
          style={{width:'100%'}}
        >
          <Input
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus()
            }}
            name="name"
            icon="user"
            placeholder="Nome"
          />
          <Input
            ref={emailInputRef}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus()
            }}
            keyboardType="email-address"
            name="email"
            icon="mail"
            placeholder="E-mail"
          />
          <Input
            ref={passwordInputRef}
            secureTextEntry
            textContentType="newPassword"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm()
            }}
            name="password"
            icon="lock"
            placeholder="Password"
          />
          <Button
              onPress={() => {
                formRef.current?.submitForm()
              }}
          >
            Entrar
          </Button>
        </Form>

      </Container>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff"/>
        <BackToSignInText>Voltar para o log-in</BackToSignInText>
      </BackToSignIn>
      </ScrollView>
    </KeyboardAvoidingView>
    );
}

export default SignUp;
