import React from 'react';
import {AuthProvider} from './common/AuthProvider';
import Routes from './common/Routes';
// import {API_URL} from '@env';
import {HomeProvider} from './common/HomeProvider';

declare const global: {HermesInternal: null | {}};

console.log('🚀 Running app 🚀');
const App = () => {
  return (
    <AuthProvider>
      <HomeProvider>
        <Routes />
      </HomeProvider>
    </AuthProvider>
  );
};

export default App;
