import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Provider} from 'react-native-paper';
import {palette} from '../../../assets/theme';

export const menu = (
  <Provider>
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View>
          <Text style={styles.text}>
            Basic App
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={() => Logout()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  </Provider>
);

const Logout = () => {
  //prompt confirmation from user
  //displays modal
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
        } catch (e) {
          console.error(e);
        }
      },
    },
  ]);
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: 'normal',
    color: palette.GREY,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    color: palette.GREY,
    textAlign: 'center',
  },
});
