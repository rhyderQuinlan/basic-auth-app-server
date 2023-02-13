import React from 'react';

type HomeContextState = {
  toggleDrawer: (toggle: boolean) => void;
  drawer: boolean | undefined;
};

export const HomeContext = React.createContext<HomeContextState>(
  {} as HomeContextState,
);

export const HomeProvider: React.FC = ({children}) => {
  const [drawer, setDrawer] = React.useState<boolean>();

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
        toggleDrawer: toggleDrawer,
        drawer,
      }}>
      {children}
    </HomeContext.Provider>
  );
};
