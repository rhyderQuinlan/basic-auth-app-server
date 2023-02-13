import {Linking} from 'react-native';

async function openLink(url: string) {
  const supported = await Linking.canOpenURL(url);

  if (!supported) {
    return Promise.reject(new Error('Provided URL can not be handled'));
  }
  return Linking.openURL(url);
}

export default openLink;
