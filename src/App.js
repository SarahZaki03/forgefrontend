import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Lands from "./pages/Lands";
import Contact from "./pages/Contact";
import Pdf from "./pages/Pdf";
import Authentication from "./pages/Authentication";
import { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./Logout";
import Requestform from "./pages/Requestform";
import Parcel from "./pages/Parcel";
import UserRequests from "./pages/UserRequests";
import ParcelByActivity from "./pages/ParcelByActivity";
import MainMap from "./pages/MainMap";
import MapWith3DModel from "./pages/MapBox/MapWith3DModel";

import { ThemeProvider, createTheme } from "@mui/material";

import Forge from "./pages/Forge";
import Viewer from "./pages/Viewer/Viewer";
import MapViewer from "./pages/MapViewer/MapViewer";
import GoogleMapViewer from "./pages/GoogleMapViewer/GoogleMapViewer";
import ThreeViewer from "./pages/ThreeViewer/ThreeViewer";
import { Mapbox } from "./pages/ReactThreeMap/MapBox";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2753a9",
    },
  },
});

// Context is designed to share data that can be considered “global” for a tree of React components,

const router = createBrowserRouter([
  {
    path: "/",
    element: <Lands />,
  },
  { path: "/map", element: <MainMap /> },
  {
    path: "/lands/:landId/:name",
    element: <ParcelByActivity />,
  },
  {
    path: "/parcel/:landId/:parcelId",
    element: <Parcel />,
  },
  { path: "/contact", element: <Contact /> },
  { path: "/path", element: <Pdf /> },
  { path: "/auth", element: <Authentication />, action: authAction },
  { path: "/logout", action: logoutAction },
  { path: "/requestform/:parcelId", element: <Requestform /> },
  { path: "/userrequests/:userId", element: <UserRequests /> },
  { path: "/forge", element: <Forge /> },
  { path: "/threeviewer", element: <ThreeViewer /> },
  { path: "/threemap", element: <Mapbox /> },
  { path: "/viewer", element: <Viewer /> },
  { path: "/mapviewer", element: <MapViewer /> },
  { path: "/googlemapviewer", element: <GoogleMapViewer /> },
  { path: "/mapbox", element: <MapWith3DModel /> },
]);
// <Route path="/users/:userId" element={<Users />} />

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
