import * as Location from '@react-native-community/geolocation';
import {UserLocation} from '../../common/HomeProvider';



export const getUserLocation = async (): Promise<UserLocation> => {
  console.log('getUserLocation');
  return new Promise(async function (resolve, reject) {
    try {
      Location.default.getCurrentPosition(location => {
        const userLocation: UserLocation = {
          Latitude: location.coords.latitude,
          Longitude: location.coords.longitude,
          Accuracy: location.coords.accuracy,
        };
        resolve(userLocation);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const askPermissions = async () => {
  console.log('askPermissions');
  return new Promise(async function (resolve, reject) {
    resolve(await Location.default.requestAuthorization());
  });
};
