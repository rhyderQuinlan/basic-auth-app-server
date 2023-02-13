import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './Login';
import {RememberProvider} from './RememberContext';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <>
      <RememberProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              header: () => null,
            }}
          />
        </Stack.Navigator>
      </RememberProvider>
    </>
  );
}
