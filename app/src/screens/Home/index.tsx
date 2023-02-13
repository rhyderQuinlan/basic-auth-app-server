import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MapScreen from './MapScreen';
import Loading from './components/Loading';
import {HomeContext} from '../../common/HomeProvider';
import {
  askPermissions,
  getUserLocation,
} from '../../services/mapservices/mapservice';

const Stack = createStackNavigator();

export default function HomeStack() {
  const {userLocation, setUserLocation} = React.useContext(HomeContext);

  React.useEffect(() => {
    askPermissions()
      .then(permissions => {
        getUserLocation()
          .then(data => {
            setUserLocation(data);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, [setUserLocation]);
  
  return (
    <>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen
          name="Map"
          component={userLocation === undefined ? Loading : MapScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
