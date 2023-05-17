import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

function Footer() {
  //
  const [locationAccess, setlocationAccess] = useState(false);
  const [mapPosition, setmapPosition] = useState({});
  const showPosition = (position) => {
    console.log(position);
    setmapPosition(position);
    console.log(`${position.coords.longitude} - ${position.coords.latitude}`);
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        setlocationAccess(true);
        console.log(result.state);
        //If granted then you can directly call your function here
      } else if (result.state === 'prompt') {
        console.log(result.state);
      } else if (result.state === 'denied') {
        alert('You need to enable location to display accurate location');
        //If denied then you have to show instructions to enable location
      }
      result.onchange = function () {
        console.log(result.state);
      };
    });
  } else {
    console.log('geolocation is not supported by your browser');
  }
  //
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  //
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDGOD8meDo6x38y64GMIGi3wekwcnjSk6w' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
      </GoogleMapReact>
    </div>
  );
}

export default Footer;
