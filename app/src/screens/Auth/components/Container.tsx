import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Prop {
  children: React.ReactNode;
}

export default function Container({children}: Prop) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>{children}</View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 60,
  },
});
