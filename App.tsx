import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './src/navigation/Navigation';
import { PermissionProvider } from './src/context/PermissionContext';

export const App = () => {
  return (
    <NavigationContainer>
      <PermissionProvider>
        <StackNavigator/>
      </PermissionProvider>
    </NavigationContainer>
  );
};

export default App;
