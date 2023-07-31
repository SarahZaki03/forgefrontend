import React, { useEffect, useState } from "react";
// import mapboxgl from 'mapbox-gl';
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./Mapbox.css";
import Header from "../../components/Header/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import DescriptionIcon from "@mui/icons-material/Description";

const MapWith3DModel = () => {
  let [endMap, setMap] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [center, setCenter] = useState([31.5952937, 29.9553728]);

  const displayModel = (ext) => {
    const searchFirst = document.querySelector("#id");
    if (searchFirst) {
      searchFirst.remove();
    }
    const container = document.createElement("div");
    container.id = "map";
    container.className = "map";
    const mainContainer = document.querySelector("#box-container");
    mainContainer.appendChild(container);

    startDisplayingModel(ext);
  };

  function startDisplayingModel(ext) {
    window.mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FyYWgwMzcwIiwiYSI6ImNsa2NhZ3RobzBxYzQzbHFvMDFmZ2o0aXcifQ.7cG-z4IvKSYDJvdn1IG3dQ";
    const map = new window.mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 18,
      center: center,
      pitch: 50,
      antialias: true,
      // attributionControl: true,
    });

    map.addControl(new window.mapboxgl.NavigationControl());
    map.addControl(new window.mapboxgl.ScaleControl());
    map.addControl(new window.mapboxgl.FullscreenControl());

    setMap(map);
    const modelOrigin = center;
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];

    const modelAsMercatorCoordinate =
      window.mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],

      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        const loader = new GLTFLoader();
        //  const loader = new THREE.GLTFLoader();
        const pathToGLTF = "./output/gltf1/output.gltf";
        // if (ext == "rvt") {
        //   pathToGLTF =
        //     "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf";
        // }
        loader.load(
          // "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
          pathToGLTF,
          (gltf) => {
            this.scene.add(gltf.scene);
          }
        );
        this.map = map;

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    map.on("style.load", () => {
      map.addLayer(customLayer, "waterway-label");
    });

    return () => {
      map.remove();
    };
  }

  useEffect(() => {
    // map.addControl(new window.mapboxgl.NavigationControl());
    // map.addControl(new window.mapboxgl.ScaleControl());
    // map.addControl(new window.mapboxgl.FullscreenControl());
    // setMap(map);
    // const modelOrigin = center;
    // const modelAltitude = 0;
    // const modelRotate = [Math.PI / 2, 0, 0];
    // const modelAsMercatorCoordinate =
    //   window.mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude);
    // const modelTransform = {
    //   translateX: modelAsMercatorCoordinate.x,
    //   translateY: modelAsMercatorCoordinate.y,
    //   translateZ: modelAsMercatorCoordinate.z,
    //   rotateX: modelRotate[0],
    //   rotateY: modelRotate[1],
    //   rotateZ: modelRotate[2],
    //   scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    // };
    // const customLayer = {
    //   id: "3d-model",
    //   type: "custom",
    //   renderingMode: "3d",
    //   onAdd: function (map, gl) {
    //     this.camera = new THREE.Camera();
    //     this.scene = new THREE.Scene();
    //     const directionalLight = new THREE.DirectionalLight(0xffffff);
    //     directionalLight.position.set(0, -70, 100).normalize();
    //     this.scene.add(directionalLight);
    //     const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    //     directionalLight2.position.set(0, 70, 100).normalize();
    //     this.scene.add(directionalLight2);
    //     // use the three.js GLTF loader to add the 3D model to the three.js scene
    //     const loader = new GLTFLoader();
    //     //  const loader = new THREE.GLTFLoader();
    //     loader.load(
    //       //   "./gltf/output.glb",
    //       // "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
    //       "./output/gltf1/output.gltf",
    //       // proxyDownloadLink,
    //       (gltf) => {
    //         this.scene.add(gltf.scene);
    //       }
    //     );
    //     this.map = map;
    //     this.renderer = new THREE.WebGLRenderer({
    //       canvas: map.getCanvas(),
    //       context: gl,
    //       antialias: true,
    //     });
    //     this.renderer.autoClear = false;
    //   },
    //   render: function (gl, matrix) {
    //     const rotationX = new THREE.Matrix4().makeRotationAxis(
    //       new THREE.Vector3(1, 0, 0),
    //       modelTransform.rotateX
    //     );
    //     const rotationY = new THREE.Matrix4().makeRotationAxis(
    //       new THREE.Vector3(0, 1, 0),
    //       modelTransform.rotateY
    //     );
    //     const rotationZ = new THREE.Matrix4().makeRotationAxis(
    //       new THREE.Vector3(0, 0, 1),
    //       modelTransform.rotateZ
    //     );
    //     const m = new THREE.Matrix4().fromArray(matrix);
    //     const l = new THREE.Matrix4()
    //       .makeTranslation(
    //         modelTransform.translateX,
    //         modelTransform.translateY,
    //         modelTransform.translateZ
    //       )
    //       .scale(
    //         new THREE.Vector3(
    //           modelTransform.scale,
    //           -modelTransform.scale,
    //           modelTransform.scale
    //         )
    //       )
    //       .multiply(rotationX)
    //       .multiply(rotationY)
    //       .multiply(rotationZ);
    //     this.camera.projectionMatrix = m.multiply(l);
    //     this.renderer.resetState();
    //     this.renderer.render(this.scene, this.camera);
    //     this.map.triggerRepaint();
    //   },
    // };
    // map.on("style.load", () => {
    //   map.addLayer(customLayer, "waterway-label");
    // });
    // return () => {
    //   map.remove();
    // };
  }, []);

  const handleFileChange = () => {
    const addFile = document.getElementById("file-input");
    setFiles((oldFiles) => [...oldFiles, addFile.files[0]]);
    addFile.value = "";
  };

  const deleteFile = (index) => {
    setFiles((files) => files.filter((_, idx) => idx !== index));
  };

  const previewFile = (index) => {
    // console.log(files[index]);
    let fileName = files[index].name;
    //Get the file Extension
    let fileExtension = fileName.split(".").pop();
    console.log(fileExtension);
    // Convert File To gltf
    if (fileExtension == "rvt") {
      // display
      displayModel(fileExtension);
    } else if (fileExtension == "ifc") {
      // display
      displayModel(fileExtension);
    }
  };

  function toggleSidebar() {
    const elem = document.getElementById("left");
    console.log("clicked", endMap);

    const collapsed = elem.classList.toggle("collapsed");
    const padding = {};
    padding["left"] = collapsed ? 0 : 300;
    endMap.easeTo({
      padding: padding,
      duration: 1000,
    });

    setSidebarVisible(!sidebarVisible);
  }

  const handleMapClick = () => {
    if (sidebarVisible) {
      toggleSidebar();
    }
  };
  return (
    <div>
      <Header />
      {/* <div id="map" className="map" onClick={handleMapClick}>
        <div id="left" className="sidebar flex-center left collapsed">
          <div className="sidebar-content rounded-rect">
            <div className="content-appear">Content Data Here</div>
            <div
              className="sidebar-toggle rounded-rect left"
              onClick={toggleSidebar}
            >
              &rarr;
            </div>
          </div>
        </div>
      </div> */}
      <div className="container my-5">
        <div className="row">
          <div className="col p-2">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2 },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <InputLabel
                  sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 3 }}
                >
                  Upload File
                </InputLabel>
                <div>
                  {true ? (
                    <List>
                      {files.map((file, index) => {
                        return (
                          <ListItem key={index} sx={{ overflow: "hidden" }}>
                            <ListItemText
                              sx={{
                                color: "darkred",
                                cursor: "pointer",
                                maxWidth: "40px",
                                minWidth: "40px",
                              }}
                              onClick={() => {
                                deleteFile(index);
                              }}
                            >
                              <DeleteIcon />
                            </ListItemText>
                            <ListItemText
                              sx={{
                                color: "navy",
                                cursor: "pointer",
                                maxWidth: "40px",
                                minWidth: "40px",
                              }}
                              onClick={() => {
                                previewFile(index);
                              }}
                            >
                              <PreviewIcon />
                            </ListItemText>
                            <ListItemAvatar>
                              <Avatar>
                                <DescriptionIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              sx={{ textAlign: "left" }}
                              primary={file.name}
                              secondary={false ? "Secondary text" : null}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    " "
                  )}
                </div>
                <TextField
                  required
                  type="file"
                  name="file"
                  id="file-input"
                  onChange={handleFileChange}
                />
                <Divider>How To use the map</Divider>
                <p>Right mouse slide </p>
                <p>Left mouse slide </p>
              </div>
            </Box>
          </div>
          <div id="box-container" className="col"></div>
        </div>
      </div>
      <div style={{ height: "75px" }}></div>
    </div>
  );
};

export default MapWith3DModel;
