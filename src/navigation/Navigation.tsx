import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { MapScreens } from '../screens/MapScreens';
import { PermissionScreens } from '../screens/PermissionScreens';
import { PermissionContext } from '../context/PermissionContext';
import { Loading } from '../components/Loading';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {permission} = useContext(PermissionContext);

  if (permission.locationStatus === 'unavailable'){
  // if (true){
    return <Loading/>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle:{backgroundColor: 'white'},
      }}
    >
      {permission.locationStatus === 'granted'
      ? <Stack.Screen name="MapScreens" component={MapScreens} />
      : <Stack.Screen name="PermissionScreens" component={PermissionScreens} />
      }

    </Stack.Navigator>
  );
};
