import { useMutation, gql } from '@apollo/client';

const AUTH_LOGIN = gql`
  mutation AuthLogin($input: LoginInput!) {
    login(input: $input) {
      token
      username
    }
  }
`;
export const useAuth = () => {
  const [loginMutation, { data, loading, error }] = useMutation(AUTH_LOGIN);

  const handleLogin = async (username, password) => {
    try {
      const response = await loginMutation({
        variables: {
          input: {
            username: username,
            password: password
          }
        }
      });
      return response.data.login;
    } catch (err) {
      console.error("Error en login:", err);
      throw err;
    }
  };

  return { handleLogin, loading, error, data };
};