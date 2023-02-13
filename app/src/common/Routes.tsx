import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../common/AuthProvider';
import AuthStack from '../screens/Auth';
import {getTokens} from '../services/serverclient/accesstokens';
import HomeStack from '../screens/Home';
import {StatusBar} from 'react-native';

export default function Routes() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const {setAuthTokens, user} = React.useContext(AuthContext);

  React.useEffect(() => {
    getTokens()
      .then((tokens: any) => {
        console.log('tokens', tokens);
        if (tokens) {
          setAuthTokens(tokens);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [setAuthTokens]);

  if (loading) {
    return null;
  }

  console.log('user', user);
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" hidden={false} />
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
