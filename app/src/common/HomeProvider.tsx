import React from 'react';

export type UserLocation = {
  Latitude: number;
  Longitude: number;
  Accuracy: number | null;
};

type HomeContextState = {
  setUserLocation: (userLocation: UserLocation) => void;
  userLocation?: UserLocation;
  toggleDrawer: (toggle: boolean) => void;
  drawer: boolean | undefined;
};

export const HomeContext = React.createContext<HomeContextState>(
  {} as HomeContextState,
);

export const useUserLocation = (): UserLocation => {
  const {userLocation} = React.useContext(HomeContext);
  return userLocation!;
};

export const HomeProvider: React.FC = ({children}) => {
  const [userLocation, setUserLocation] = React.useState<UserLocation>();
  const [drawer, setDrawer] = React.useState<boolean>();

  const setUserLocationState = React.useCallback(
    async (userLocation: UserLocation) => {
      try {
        setUserLocation(userLocation);
      } catch (err) {
        console.error(err);
      }
    },
    [setUserLocation],
  );

  const toggleDrawer = React.useCallback(
    async (drawer: boolean) => {
      if (drawer) {
        setDrawer(false);
      } else {
        setDrawer(true);
      }
    },
    [setDrawer],
  );

  return (
    <HomeContext.Provider
      value={{
        setUserLocation: setUserLocationState,
        userLocation,
        toggleDrawer: toggleDrawer,
        drawer,
      }}>
      {children}
    </HomeContext.Provider>
  );
};
