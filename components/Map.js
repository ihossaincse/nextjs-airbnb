import { getCenter } from 'geolib';
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const Map = ({searchResults}) => {
    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map(({lat, long}) => (
        {latitude: lat, longitude: long}
    ));
    const center = getCenter(coordinates);
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL {...viewport}
            mapStyle="mapbox://styles/ihossainworkbd/ckx4ui1uu085x14nkvwokprqk"
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map(({lat, long, title}) => (
               <div key={lat + long}>
                   <Marker latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
                        <p onClick={() => setSelectedLocation({lat, long})} className="cursor-pointer text-2xl animate-bounce text-red-600" role="img" aria-label="push-pin">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </p>
                    </Marker>
                    {selectedLocation.long === long ? 
                        (<Popup onClose={() => setSelectedLocation({})} closeOnClick={true} latitude={lat} longitude={long}>{title}</Popup>) : (
                            false
                        )
                    }
               </div>     
            ))}
        </ReactMapGL>
    )
}

export default Map
