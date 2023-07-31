import React from "react";
import { init, setupModelUpload } from "./GoogleMapViewerFunction";
import Header from "../../components/Header/Header";
import { ChangeEvent, useState } from "react";

// setupModelUpload();

// const input = document.getElementById("map-input");
// input.addEventListener("change", setupModelUpload);

const handleFile = async (event) => {
  console.log(event.target);
  await setupModelUpload(event.target);
};

const GoogleMapViewer = () => {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      console.log("nofile");
      return;
    }

    await fetch("http://localhost:8080/model/api/models", {
      method: "POST",
      body: file,
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />
      <div id="header">
        <select name="models" id="map-models"></select>
        <input type="file" id="map-input" onClick={handleFileChange} />
        <button
          id="map-upload"
          title="Upload New Model"
          onClick={handleUploadClick}
        >
          Upload
        </button>
      </div>
      <div
        id="google-map-viewer"
        style={{
          width: "90vw",
          height: "70vh",
          position: "absolute",
          left: "65px",
          top: "150px",
        }}
      ></div>
      <div id="map-overlay"></div>
    </div>
  );
};

export default GoogleMapViewer;
