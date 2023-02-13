import React from 'react';

export type MethodTyes = {
  methodId: number;
  name: string;
  type: string;
};

export type State = {
  email: string;
  userId: number;
  methods: Array<MethodTyes>;
};

export type Context = {
  data: State | undefined;
  setData: (data: State) => void;
};

const initialState = {
  data: undefined,
  setData: () => {},
};

export type RememberProviderProps = {children: React.ReactNode};

export const RememberContext = React.createContext<Context>(initialState);

export const RememberProvider = ({children}: RememberProviderProps) => {
  const [data, setData] = React.useState<State>();

  return (
    <RememberContext.Provider value={{data, setData}}>
      {children}
    </RememberContext.Provider>
  );
};
