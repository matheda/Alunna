import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../services/types';

import { Menu } from '../../components/Header/Menu';
import { Status } from '../../components/UI/StatusBar';

const Security: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <Status />
      <Menu title='Security' onBack={() => navigation.goBack()} />
    </>
  )
}

export { Security }