import SInfo from 'react-native-sensitive-info';
import create from 'zustand';

import { combine } from 'zustand/middleware';
import { accessToken } from '../hooks/context';

const accessTokenName = '@storage_key';

export const useTokenStore = create(
  combine(
    { accessToken },
    (set: any) => ({
      setTokens: async (x: { accessToken: string }) => {
        try {
          await SInfo.setItem(accessTokenName, x.accessToken, {
            sharedPreferencesName: 'auth_alunna',
            keychainService: 'alunna'
          });
        } catch { }

        set(x);
      },
      loadTokens: async () => {
        try {
          let accessToken = await SInfo.getItem(accessTokenName, {
            sharedPreferencesName: 'auth_alunna',
            keychainService: 'alunna'
          });
          accessToken = accessToken ?? '';
          set({ accessToken })
        } catch { }
      },
    })
  )
);