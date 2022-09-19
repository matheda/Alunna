import { getAuthToken } from '../hooks/context';

export const isSignedIn = async () => {
  const token = await getAuthToken();
  return token != null ? true : false
};
