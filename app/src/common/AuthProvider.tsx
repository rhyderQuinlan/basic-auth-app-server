import React from 'react';
import {
  AuthTokens,
  removeTokens,
  saveTokens,
} from '../services/serverclient/accesstokens';

type User = {
  id: string;
};

type AuthContextState = {
  hasStoredTokens: () => Boolean;
  logout: () => void;
  setUser: (user: User) => void;
  user?: User;
  setAuthTokens: (authTokens: AuthTokens) => void;
  authTokens?: AuthTokens;
};

export const AuthContext = React.createContext<AuthContextState>(
  {} as AuthContextState,
);

export const useUser = (): User => {
  const {user} = React.useContext(AuthContext);
  return user!;
};

export const useAuthTokens = (): AuthTokens => {
  const {authTokens} = React.useContext(AuthContext);
  return authTokens!;
};

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User>();
  const [authTokens, setAuthTokens] = React.useState<AuthTokens>();

  const setAuthTokensState = React.useCallback(
    async (authTokens: AuthTokens) => {
      try {
        console.log(`Set Auth Tokens State ${authTokens}`);
        setAuthTokens(authTokens);
        await saveTokens(authTokens);
        setUser({id: '1'});
      } catch (err) {
        console.error(err);
      }
    },
    [setAuthTokens, setUser],
  );

  const logout = React.useCallback(async () => {
    try {
      setAuthTokens(undefined);
      setUser(undefined);
      await removeTokens();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        setUser,
        setAuthTokens: setAuthTokensState,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
