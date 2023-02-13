import * as React from 'react';
import {StyleSheet, View, SafeAreaView, Alert} from 'react-native';
import {Button, Provider, Text} from 'react-native-paper';

import {palette} from '../../assets/theme';
import {AuthContext} from '../../../common/AuthProvider';
import {HomeContext} from '../../../common/HomeProvider';

export default function SideMenuComponent() {
  const {logout} = React.useContext(AuthContext);
  return (
    <Provider>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <SafeAreaView style={styles.sidemenu}>
          <Text variant="titleLarge">Header</Text>
          <Button
            mode="contained"
            onPress={() => {
              Alert.alert('Logout', 'Are you sure you would like to logout?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  onPress: () => {
                    try {
                      console.log('LOGOUT');
                      logout();
                    } catch (e) {
                      console.error(e);
                    }
                  },
                },
              ]);
            }}>
            Logout
          </Button>
        </SafeAreaView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sidemenu: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
