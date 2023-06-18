/* eslint-disable no-sequences */
import {useEffect, useState, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setinitialPosition] = useState<Location>();
  const [routeLines, setRoutesLines] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  const watchIdLocation = useRef<number>();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () =>{
      isMounted.current = false;
    };

  },[]);

  useEffect(()=>{
    if (!isMounted.current) {return;}
      getCurrentLocation().then((location) =>{
        setinitialPosition(location);
        setUserLocation(location);
        setRoutesLines(routes => [...routes, location]);
        setHasLocation(true);
      });
    },[]);

    const getCurrentLocation = () : Promise<Location> =>{
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          ({coords})=> {
            // console.log(coords);
            resolve({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          }),
          (err: any) => reject({err}), { enableHighAccuracy: true };
      });
    };

    const followUserLocation = () => {
      watchIdLocation.current = Geolocation.watchPosition(
          ({coords}) => {
            if (!isMounted.current) {return;}
            let location: Location = {
              latitude: coords.latitude,
              longitude:coords.longitude,
            };
            setUserLocation(location), console.log(location);
            setRoutesLines(routes => [...routes, location]);
          },
          (error) => console.log(error),
          {enableHighAccuracy: true, distanceFilter: 10}
    );};

    const stopFollowUserLocation = () => {
      Geolocation.clearWatch(watchIdLocation.current!);
    };

    return {
      hasLocation,
      initialPosition,
      getCurrentLocation,
      followUserLocation,
      stopFollowUserLocation,
      userLocation,
      routeLines,
    };

};
