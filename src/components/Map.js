import React, { useState } from "react";
import {
  MapContainer,
  Popup,
  Polygon,
  CircleMarker,
  TileLayer,
  Rectangle,
  SVGOverlay,
  FeatureGroup,
  Circle,
  Marker,
  useMapEvents,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import locations from "../geodata.json";
import { Button, Typography } from "@mui/material";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const Map = () => {
  const center = [30.032, 31.75203];
  const zoomLevel = 13;

  const circleCenter = [30.029025894741707, 31.758735477391582];
  const purpleOptions = { fillColor: "#3055A3", weight: 0 };
  const greyOptions = { fillColor: "black", weight: 0 };

  const rectangle = [
    [30.0336829518494, 31.762364012829437],
    [30.030301566514808, 31.76840862157917],
  ];

  const polygon = [
    [30.0336829518494, 31.762364012829437],
    [30.030301566514808, 31.76840862157917],
    [30.029025894741707, 31.758735477391582],
    [30.029025894741767, 31.758735477391592],
  ];

  return (
    <MapContainer center={center} zoom={zoomLevel} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Available Parcels">
          <LayerGroup>
            {locations.features.map((polygon, index) => (
              <>
                <Polygon
                  key={index}
                  pathOptions={purpleOptions}
                  positions={polygon.geometry.coordinates[0]}
                >
                  <Tooltip>
                    <Typography sx={{ fontWeight: "bold" }}>
                      KG 03 Land
                    </Typography>
                  </Tooltip>
                </Polygon>
                <Marker position={polygon.geometry.coordinates[0][0]}>
                  <Popup>
                    <Typography sx={{ fontWeight: "bold" }}>
                      KG 03 Land
                    </Typography>
                    <Button size="small" variant="contained">
                      Request
                    </Button>
                    <Typography>Hospital Land</Typography>
                  </Popup>
                </Marker>
              </>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Registered Parcels">
          <FeatureGroup pathOptions={greyOptions}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle
              center={[30.029460854304844, 31.76217802486562]}
              radius={200}
            >
              <Tooltip>
                <Typography sx={{ fontWeight: "bold" }}>KG 03 Land</Typography>
              </Tooltip>
            </Circle>
            {/* <Rectangle bounds={rectangle} /> */}
            {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
          </FeatureGroup>
        </LayersControl.Overlay>

        {/*
         *  Go To Your Location
         *  <LocationMarker /> */}
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
