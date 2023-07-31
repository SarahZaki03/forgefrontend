import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Polygon,
  CircleMarker,
  TileLayer,
  Rectangle,
  SVGOverlay,
} from "react-leaflet";
import { Icon } from "leaflet";
import Button from "./Button/Button";

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
    [51.54, -0.12],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
];

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

const polygon = [
  [51.505, -0.12],
  [51.506, -0.13],
  [51.507, -0.13],
  [51.508, -0.12],
];

// For SVG
const bounds = [
  [51.49, -0.08],
  [51.5, -0.06],
];

export const Map = (props) => {
  const center = [51.505, -0.09];
  const position = [props.latitude, props.longitude];
  const zoomLevel = 16;

  const purpleOptions = { color: "purple", border: "none" };
  const redOptions = { color: "red" };
  const blackOptions = { color: "black" };

  const codingSpot = new Icon({
    iconUrl: "/images/computer-solid.svg",
    iconSize: [30, 125],
    iconAnchor: [40, 90],
    popupAnchor: [-25, -40],
  });

  return (
    <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          Omu-Aran the Head Post of Igbomina land, is a town in the Nigerian
          state of Kwara. It originated from Ife and currently the local
          government headquarters of Irepodun local government.
          <div>
            <Button title="Click Here" />
          </div>
        </Popup>
      </Marker>
      <CircleMarker center={center} pathOptions={redOptions} radius={30}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      {/* <Marker position={position} icon={codingSpot}>
        <Popup>
          24 hours coding area
          <img
            draggable="false"
            role="img"
            className="emoji"
            alt=""
            src="https://s.w.org/images/core/emoji/14.0.0/svg/1f468-200d-1f4bb.svg"
          />
        </Popup>
      </Marker> */}

      <Polygon pathOptions={purpleOptions} positions={polygon} />
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
      {/* <Rectangle bounds={rectangle} pathOptions={blackOptions} /> */}

      <SVGOverlay attributes={{ stroke: "black" }} bounds={bounds}>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,255,.5)"
          stroke="transparent"
        />
        {/* <circle r="5" cx="10" cy="10" fill="red" /> */}
        <text
          x="20%"
          y="50%"
          stroke="white"
          style={{
            "letter-spacing": "2pt",
            "font-family": "monospace",
            "font-size": "1.3rem",
            color: "white",
          }}
        >
          KG03 Land
        </text>
      </SVGOverlay>
    </MapContainer>
  );
};
