import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';

import {palette} from '../../assets/theme';
import Container from './components/Container';

interface IProps {
}

interface IState {
  fullscreen: boolean;
}

export class Homescreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      fullscreen: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text variant='titleLarge' style={{color: palette.WHITE}}>Homescreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
