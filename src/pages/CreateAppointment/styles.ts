import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const BackButton = styled.TouchableOpacity``;
export const HeaderTitle = styled.Text``;
export const UserAvatar = styled.Image``;
