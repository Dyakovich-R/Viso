//import React from 'react';
import Map, { Marker } from 'react-map-gl';
import '../Style/Maps.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MarkerType } from '../type/Marker';
import { useState } from 'react';
import location from '../images/location-pin.png';

interface IMaps {
  markers: MarkerType[];
  onAddMarker: (lat: number, lng: number) => void;
  onRemoveMarker: (id: string) => void;
  onUpdateMarker: (id: string, lat: number, lng: number) => void;
}

const MAPBOX_TOKEN =
  'pk.eyJ1Ijoicm9tYW45MCIsImEiOiJjbHgxdnFpeWEwZTNwMnJxdWU3OHhsYTFjIn0.fYiEd37HxwaUiMIeexsnLA';

export const Maps: React.FC<IMaps> = ({
  markers,
  onAddMarker,
  onRemoveMarker,
  onUpdateMarker,
}) => {
  const [viewport, setViewport] = useState({
    latitude: 49.8397,
    longitude: 24.0297,
    zoom: 10,
  });

  const [loading, setLoading] = useState(true);

  // CLIKING EVERYTHING ON THE MAP to add a new marker
  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    // Checking the availability of LAT and LNG values ​​before call onaddmarker
    if (lngLat && lngLat.lat !== undefined && lngLat.lng !== undefined) {
      onAddMarker(lngLat.lat, lngLat.lng); // We pull Lat and LNG from lnglat
    } else {
      console.error('Invalid lngLat object: ', lngLat);
    }
  };

  return (
    <>
      {loading && <h1>LOADING...</h1>}
      <Map
        initialViewState={{ ...viewport }}
        style={{ width: '100%', height: '85vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={handleMapClick} // Add the marker when click on the map
        onMove={env => setViewport(env.viewState)} // Update Viewport when moving the card
        onLoad={() => setLoading(false)}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            longitude={Number(marker.lng)} // Make sure LNG is the number
            latitude={Number(marker.lat)} // Make sure Lat is a number
            onDragEnd={event => {
              const { lngLat } = event;
              if (
                lngLat &&
                lngLat.lat !== undefined &&
                lngLat.lng !== undefined
              ) {
                onUpdateMarker(marker.id, lngLat.lat, lngLat.lng);
              } else {
                console.error('Invalid lngLat object: ', lngLat);
              }
            }}
            draggable
          >
            <div className="marker">
              {marker.id.slice(5, 9)}
              <img
                className="img"
                src={location}
                alt="Location"
              />
            </div>
            {/* We reflect the marker ID */}
            <button
              onClick={e => {
                e.stopPropagation(); // Prevent the event
                onRemoveMarker(marker.id);
              }}
              className="button"
            >
              Delate
            </button>
          </Marker>
        ))}
      </Map>
    </>
  );
};
