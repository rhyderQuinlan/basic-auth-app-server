import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Navigation from './Navigation';
import Loading from './components/Loading';
import {HomeContext} from '../../common/HomeProvider';

const Stack = createStackNavigator();

export default function HomeStack() {
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={ loading ? Loading : Navigation}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
