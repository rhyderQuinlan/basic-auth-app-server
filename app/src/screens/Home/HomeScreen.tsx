import * as React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SideMenu from 'react-native-side-menu';

import {HomeContext} from '../../common/HomeProvider';

import {Homescreen} from './Screen';
import {menu} from './components/Menu';

export default function HomeScreen() {
  const {userLocation, drawer, toggleDrawer} = React.useContext(HomeContext);
  return (
    <View style={styles.container}>
      <SideMenu
        menu={menu}
        isOpen={drawer}
        onChange={() => toggleDrawer(drawer)}>
        <Homescreen userLocation={userLocation} />
      </SideMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
