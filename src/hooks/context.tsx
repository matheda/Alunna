import SInfo from 'react-native-sensitive-info';
import { ZodSchema, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormProps } from 'react-hook-form';

export const setAuthToken = async (value: string) => {
  const token = await SInfo.setItem('@storage_key', value, {
    sharedPreferencesName: 'auth_alunna',
    keychainService: 'alunna'
  });
  return token
}

export const getAuthToken = async () => {
  const token = await SInfo.getItem('@storage_key', {
    sharedPreferencesName: 'auth_alunna',
    keychainService: 'alunna'
  });
  return token
}

export const accessToken = undefined;

type Options<T extends ZodSchema<any>> = UseFormProps<TypeOf<T>> & {
  schema: T
}

export const useZodForm = <T extends ZodSchema<any>>({ schema, ...options }: Options<T>) => {
  return useForm({ ...options, resolver: zodResolver(schema) })
}