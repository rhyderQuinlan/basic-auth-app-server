import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import SideMenu from 'react-native-side-menu';

import {HomeContext} from '../../common/HomeProvider';

import {Homescreen} from './HomeScreen';
import SideMenuComponent from './components/Menu';

export default function Navigation() {
  const {drawer, toggleDrawer} = React.useContext(HomeContext);
  return (
    <View style={styles.container}>
      <SideMenu
        menu={SideMenuComponent()}
        isOpen={drawer}
        onChange={() => toggleDrawer(drawer)}>
        <Homescreen />
      </SideMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
