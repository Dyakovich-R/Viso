import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import { db } from './type/FirebaseConfig';
import { Maps } from './components/Maps';
import { onValue, push, ref, set, remove, update } from 'firebase/database';

// Type for markers
interface MarkerType {
  id: string;
  lat: number;
  lng: number;
}

// functionalComponentOfTheApplication
function App() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  // We use useeffect to get markers with Firestore when mounting component
  useEffect(() => {
    // Subscription to the 'Markers' collection in Firestore
    const markersRef = ref(db, 'markers');
    onValue(markersRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const loadedMarkers = Object.keys(data).map(key => ({
          id: key,
          lat: data[key].lat,
          lng: data[key].lng,
        }));
        setMarkers(loadedMarkers);
      }
    });
  }, []);

  // 
const addMarker = async (lat: number, lng: number) => {
  // We get a link to the 'Markers' collection in Firebase database
  const markersRef = ref(db, 'markers');
  // We create a new link for a new marker
  const newMarkerRef = push(markersRef);
  // We create a new marker with LAT and LNG coordinates
  const newMarker = { lat, lng };
  // We add a new marker to the database using SET feature
  await set(newMarkerRef, newMarker);
  // We update Markers's status with a new marker with a unique ID provided Firebase
  setMarkers([...markers, { id: newMarkerRef.key!, lat, lng }]);
};

const updateMarker = async (id: string, lat: number, lng: number) => {
  // We get a reference to a particular marker in database for its ID
  const markerRef = ref(db, `markers/${id}`);
  // We update the marker coordinates in the database
  update(markerRef, { lat, lng });
  // We update Markers status by changing the marker coordinates with the ID specified
  setMarkers(
    markers.map(marker =>
      marker.id === id ? { ...marker, lat, lng } : marker,
    ),
  );
};

const removeMarker = async (id: string) => {
  // We get a reference to a particular marker in database for its ID
  const markerRef = ref(db, `markers/${id}`);
  // We delete the marker from the database
  remove(markerRef);
  // We update Markers status by removing the marker with the specified ID
  setMarkers(markers.filter(marker => marker.id !== id));
};
  return (
    <>
      <h1>Maps Lviv</h1>
      <Maps
        onUpdateMarker={updateMarker}
        markers={markers}
        onAddMarker={addMarker}
        onRemoveMarker={removeMarker}
      />
    </>
  );
}

export default App;
