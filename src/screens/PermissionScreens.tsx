import React, { useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PermissionContext } from '../context/PermissionContext';
import { ButtonText } from '../components/Button';

export const PermissionScreens = () => {
  const {permission, askLocationPermission} = useContext(PermissionContext);

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20}}>
        Permission Screen
      </Text>
      <ButtonText
        onPress={askLocationPermission}
        title="Permisos"
      />

      <Text>
        {JSON.stringify(permission, null, 2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
