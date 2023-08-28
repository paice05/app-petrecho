import { useNavigation } from '@react-navigation/native';
import { clearCache } from '../../services/cache';

export const useLogout = () => {
  const navigation = useNavigation();

  const redirectLogin = () => {
    clearCache('token');

    navigation.navigate('Onboarding');
  };

  return {
    redirectLogin,
  };
};
