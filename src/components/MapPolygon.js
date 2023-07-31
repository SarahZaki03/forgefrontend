import React from "react";
import { MapContainer, Polygon, TileLayer, Marker, Popup } from "react-leaflet";

const MapPolygon = (props) => {
  const purpleOptions = { fillColor: "#0000FF", weight: 0 };
  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={false}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.polygon[0]}>
        <Popup>
          <b>District1: Land K7</b>
        </Popup>
      </Marker>
      <Polygon pathOptions={purpleOptions} positions={props.polygon} />
    </MapContainer>
  );
};

export default MapPolygon;
