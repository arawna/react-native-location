/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Circle } from 'react-native-maps';


const App = () => {

  const [latitude,setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    Geolocation.requestAuthorization;
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
    //   "title":"MapsAndGeo",
    //   "message":"Konumunuzu istiyoruz"
    // })
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const {coords:{latitude,longitude}} = position;
    //     setLatitude(latitude);
    //     setLongitude(longitude);
    //   },
    //   error => {
    //     console.log(error)
    //   },
    //   {
    //   }
    // )
    Geolocation.watchPosition(
      position => {
        console.log(position);
        const {coords:{latitude,longitude}} = position;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      }
    )
  },[])

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
      >
        {/* <Marker title='Konum' description='Şuanki Konum' pinColor='gray' coordinate={{latitude: latitude,longitude: longitude,latitudeDelta: 0.015,longitudeDelta: 0.0121}} /> */}
        {/* <Polygon strokeWidth={3} strokeColor="red" fillColor='purple' coordinates={[
          {
            latitude:latitude,
            longitude:longitude
          },
          {
            latitude:latitude+10, 
            longitude:longitude+1
          },
          {
            latitude:latitude+10, 
            longitude:longitude+5
          }
        ]}/> */}
        {/* <Circle center={{latitude:latitude,longitude:longitude}} strokeWidth={3} strokeColor="red" radius={50} /> */}

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default App;

// export default class App extends React.Component {

//   componentDidMount() {
//     Geolocation.requestAuthorization;
//     Geolocation.watchPosition(
//       position => {
//         const {coords:{latitude,longitude}} = position;
//         console.log(`Latitute:${latitude}  Longitute:${longitude}`)
//       },
//       error => {
//         console.log(error);
//       }
//     )
//   }

//   render() {
//     return (
//       <SafeAreaView>
//         <View style={{justifyContent:"center",alignItems:"center"}}>
//           <Text>Latitude: </Text>
//           <Text>Longitude: </Text>
//         </View>
//     </SafeAreaView>
//     )
//   }
// }