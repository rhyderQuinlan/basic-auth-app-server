import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import {palette} from '../assets/theme';

export type ButtonAppearance = 'default' | 'primary' | 'icon';

interface Prop {
  appearance?: ButtonAppearance;
  iconName?: string;
  title?: string;
  titleStyle?: any;
  containerStyle?: any;
  children?: React.ReactNode;
  disabled?: boolean;
  background?: any;
  onPress?: () => void;
}

export class Button extends PureComponent<Prop> {
  render() {
    const {
      title,
      titleStyle,
      containerStyle,
      children,
      disabled = false,
      onPress,
      iconName,
      appearance = 'default',
      ...attributes
    } = this.props;

    const color = palette.WHITE;
    const backgroundColor = palette.RED;

    const TouchableComponent = (
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    ) as React.ElementType;

    const buttonStyle = StyleSheet.flatten([
      styles.container,
      {backgroundColor},
      containerStyle,
    ]);

    if (Platform.Version >= 21) {
      attributes.background = TouchableNativeFeedback.Ripple(
        buttonStyle.backgroundColor
          ? buttonStyle.backgroundColor
          : backgroundColor,
        false,
      );
    } else {
      attributes.background = TouchableNativeFeedback.SelectableBackground();
    }

    return (
      <TouchableComponent onPress={onPress} disabled={disabled} {...attributes}>
        <View style={buttonStyle}>
          {children ? (
            children
          ) : (
            <Text numberOfLines={1} style={[styles.title, {color}, titleStyle]}>
              {title}
            </Text>
          )}
        </View>
      </TouchableComponent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    color: palette.WHITE,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
