import * as React from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import Container from '../../Auth/components/Container';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
}
