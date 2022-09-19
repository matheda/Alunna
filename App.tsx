/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
*/

import React from 'react';

import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { Welcome } from './src/screens/Welcome';
import { Splash } from './src/screens/Splash';
import { Login } from './src/screens/Auth/Login';
import { Register } from './src/screens/Auth/Register';

import { Lobby } from './src/screens/Lobby';

import { Conversation } from './src/screens/Inbox/Conversation';

import { Publication } from './src/screens/Content/Publication';
import { Profile } from './src/screens/Content/Profile';
import { Draft } from './src/screens/Content/Draft';
import { Media } from './src/screens/Content/Media';
import { Explorer } from './src/screens/Content/Explorer';

import { Dashboard } from './src/screens/Settings/Dashboard';
import { EditProfile } from './src/screens/Settings/EditProfile';
import { Security } from './src/screens/Settings/Security';

import { useTokenStore } from './src/services/useTokenStore';
import { RootStackParamsList } from './src/services/types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e, query) => {
      if (query.state.data !== undefined) {
        console.log((e as Error).message);
      }
    }
  }),
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if ('message' in (e as Error)) {
          //showErrorToast((e as Error).message);
          console.log((e as Error).message);
        }
      }
    },
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: 'tracked',
      retry(failureCount: number, error: any) {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
      // retry: false,
      // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 60 * 1000 * 5,
      onError: (e) => {
        if ('message' in (e as Error)) {
          console.log((e as Error).message);
        }
      },
    }
  }
});

const App: React.FC = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const loadToken = useTokenStore((state) => state.loadTokens);

  const isTokenStoreReady = useTokenStore(
    (s) => s.accessToken !== undefined
  );

  if (!isTokenStoreReady) loadToken()

  const hasToken = useTokenStore((s) => !!s.accessToken);

  React.useEffect(() => {
    if (isTokenStoreReady) {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
  }, [isTokenStoreReady]);

  if (isLoading) return <Splash />

  const config: any = {
    gestureEnabled: false,
    gestureDirection: 'horizontal',
    animation: 'slide_from_right',
    headerShown: false
  }

  return (
    <QueryClientProvider client={queryClient}>

      <SafeAreaProvider initialMetrics={initialWindowMetrics}>

        <NavigationContainer>

          <Stack.Navigator screenOptions={config}>

            {hasToken ? (
              <>
                <Stack.Screen name='Lobby' component={Lobby} />

                <Stack.Screen
                  name='Conversation'
                  component={Conversation}
                  options={{ animation: 'fade_from_bottom' }}
                />

                <Stack.Screen
                  name='Publication'
                  component={Publication}
                  initialParams={{ id: undefined }}
                />

                <Stack.Screen
                  name='Profile'
                  component={Profile}
                  initialParams={{ username: '' }}
                />

                <Stack.Screen name='Draft' component={Draft} />

                <Stack.Screen
                  name='Explorer'
                  component={Explorer}
                  initialParams={{ value: '' }}
                />

                <Stack.Screen
                  name='Media'
                  component={Media}
                  options={{ animation: 'fade' }}
                  initialParams={{ media: '', username: '', avatar: '', description: '' }}
                />

                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='EditProfile' component={EditProfile} />
                <Stack.Screen name='Security' component={Security} />
              </>
            ) : (
              <>
                <Stack.Screen name='Welcome' component={Welcome} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
              </>
            )}

          </Stack.Navigator>

        </NavigationContainer>

      </SafeAreaProvider>

    </QueryClientProvider>
  )
}

export default App;