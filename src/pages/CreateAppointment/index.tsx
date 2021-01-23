import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Container } from './styles';

interface RouteParams {
  providerId: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  console.log(routeParams.providerId);

  return <Container />;
};

export default CreateAppointment;
