import AsyncStorage from '@react-native-async-storage/async-storage';
import { TUser } from '../services/types';

export const useItsMe = async ({ match }: { match: string }) => {
  const data: any = await AsyncStorage.getItem('@storageUser');
  const { username } = JSON.parse(data) as TUser
  return match === username;
}