/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Loading } from './Loading';
import { Fab } from './Fab';

// interface Props {
//   markers: typeof Marker[]
// }

export const Maps = () => {

  const {hasLocation,initialPosition, getCurrentLocation, followUserLocation, userLocation, stopFollowUserLocation, routeLines} = useLocation();
  const mapViewRef = useRef<MapView>();
  const isFollowing = useRef<boolean>(true);
  const [showPolylines, setShowPolylines] = useState<boolean>(true);

  useEffect(()=>{
    followUserLocation();
    return ()=> {
      stopFollowUserLocation();
    };
  },[]);

  useEffect(() => {

    if (!isFollowing.current) {return;}
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);


  const centerPosition = async ()=>{

    if (isFollowing.current === false){
    console.log('entre');
      mapViewRef.current?.animateCamera({center: {latitude: userLocation.latitude, longitude: userLocation.longitude}});
      isFollowing.current = true;
      return;
    }
    const {latitude, longitude} = await getCurrentLocation();
    isFollowing.current = true;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  if (!hasLocation){
    return <Loading/>;
  }

  return (
    <>
      <MapView
        ref={(e) => mapViewRef.current = e!}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: initialPosition!.latitude,
          longitudeDelta: initialPosition!.longitude,
      }}
        onTouchStart={()=> isFollowing.current = false}
       >
        {showPolylines &&
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        }
        <Marker
          // image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: initialPosition!.latitude,
            longitude: initialPosition!.longitude,
          }}
          title="mi casa"
          description="es un marcador"
        />
       </MapView>
       <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
       />
       <Fab
        iconName="brush-outline"
        onPress={() =>setShowPolylines(!showPolylines)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
       />

    </>
  );
};
