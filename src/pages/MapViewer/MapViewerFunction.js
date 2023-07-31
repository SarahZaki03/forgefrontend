/* global Autodesk, THREE */
import { getForgeAccessToken } from "./../../services/api";

export async function init(container) {
  return new Promise(async function (resolve, reject) {
    const data = await getForgeAccessToken();
    const options = {
      env: "AutodeskProduction",
      accessToken: data.access_token,
      isAEC: true,
    };
    Autodesk.Viewing.Initializer(options, () => {
      const config = {
        extensions: ["GoogleMapsExtension"],
      };

      const viewer = new Autodesk.Viewing.Private.GuiViewer3D(
        container,
        config
      );

      // viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, () => {
      //   // Call the GoogleMapsExtension class
      //   const options = { extensions: ["GoogleMapsExtension"] };
      //   const googleMapsExtension = new GoogleMapsExtension(viewer, options);
      //   googleMapsExtension.loadMapOverlay();
      // });
      viewer.start();
      viewer.setTheme("light-theme");
      resolve(viewer);
    });
  });
}

export function loadModel(viewer, urn) {
  return new Promise(function (resolve, reject) {
    function onDocumentLoadSuccess(doc) {
      resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
    }
    function onDocumentLoadFailure(code, message, errors) {
      // console.log("onDocumentLoadFailure");
      reject({ code, message, errors });
    }
    viewer.setLightPreset(0);
    Autodesk.Viewing.Document.load(
      `urn:${urn}`,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

// class GoogleMapsExtension extends Autodesk.Viewing.Extension {
//   constructor(viewer, options) {
//     super(viewer, options);
//   }

//   loadMapOverlay() {
//     // Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token
//     mapboxgl.accessToken =
//       "pk.eyJ1Ijoic2FyYWgwMzcwIiwiYSI6ImNsa2NidWNhMzA0a2IzZHFqcDluYmkxZmoifQ.wqr5uDAYZl2mMeWAuBfkew";

//     // Create a new map object with Mapbox GL JS
//     const map = new mapboxgl.Map({
//       container: this.viewer.container, // Use the viewer container as the map container
//       style: "mapbox://styles/mapbox/streets-v9", // Replace with your desired map style
//       center: [31.5952937, 29.9553728], // Replace with your desired center coordinates
//       zoom: 11, // Replace with your desired zoom level
//     });

//     var marker = new mapboxgl.Marker()
//       .setLngLat([31.5952937, 29.9553728])
//       .addTo(map);

//     // Add a resize event listener to update the map size when the viewer size changes
//     this.viewer.addEventListener(Autodesk.Viewing.VIEWER_RESIZE_EVENT, () => {
//       map.resize();
//     });

//     // Disable map rotation and interaction to prevent conflicts with the Forge Viewer
//     map.dragRotate.disable();
//     map.touchZoomRotate.disableRotation();
//   }

//   // Other methods (if any)

//   unload() {
//     return true;
//   }
// }
// Autodesk.Viewing.theExtensionManager.registerExtension(
//   "GoogleMapsExtension",
//   GoogleMapsExtension
// );
