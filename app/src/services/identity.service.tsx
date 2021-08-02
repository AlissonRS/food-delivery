import useFetch, { CachePolicies } from 'use-http';

const baseUrl = process.env.REACT_APP_IDENTITY_API_URL;

export const useIdentityService = () => {
  const { post, response } = useFetch(baseUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
  });

  const authenticate = async (user: any) => {
    const result = await post('api/users/authenticate', user);
    return { result, response };
  };

  const register = async (user: any) => {
    const result = await post('api/users/register', user);
    return { result, response };
  };

  return {
    authenticate,
    register,
  };
};
