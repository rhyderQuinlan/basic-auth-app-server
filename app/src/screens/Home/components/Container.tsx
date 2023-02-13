import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Prop {
  children: React.ReactNode;
}

export default function Container({children}: Prop) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.wrapper}>{children}</View>
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
});
