import React, { useState, useEffect } from "react";
import { init, loadModel } from "./MapViewerFunction";
import Header from "../../components/Header/Header";

const MapViewer = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init(document.getElementById("map-preview")).then((viewer) => {
      //console.log("inside init function");
      const urn = window.location.hash?.substring(1);
      setLoading(true);
      creategltf(urn);
      setLoading(false);
      setupModelSelection(viewer, urn);
      setupModelUpload(viewer);
    });

    async function creategltf(urn) {
      // api/models/:urn/gltf
      try {
        const resp = await fetch(
          `http://localhost:8080/model/api/models/${urn}/gltf`
        );
        // if (!resp.ok) {
        //   //console.log("resp.ok error status");
        //   throw new Error(await resp.text());
        // }
      } catch (err) {
        alert("Could not Convert the urn");
        console.error(err);
      }
    }

    async function setupModelSelection(viewer, selectedUrn) {
      //console.log("inside setupModelSelection");
      const dropdown = document.getElementById("map-models");
      dropdown.innerHTML = "";
      try {
        const resp = await fetch("http://localhost:8080/model/api/models");
        if (!resp.ok) {
          throw new Error(await resp.text());
        }
        const models = await resp.json();
        dropdown.innerHTML = models
          .map(
            (model) =>
              `<option value=${model.urn} ${
                model.urn === selectedUrn ? "selected" : ""
              }>${model.name}</option>`
          )
          .join("\n");
        dropdown.onchange = () => onModelSelected(viewer, dropdown.value);
        if (dropdown.value) {
          onModelSelected(viewer, dropdown.value);
        }
      } catch (err) {
        alert("Could not list models. See the console for more details.");
        console.error(err);
      }
    }

    async function setupModelUpload(viewer) {
      //console.log("inside setupModelUpload");
      const upload = document.getElementById("map-upload");
      const input = document.getElementById("map-input");
      const models = document.getElementById("map-models");
      upload.onclick = () => input.click();
      input.onchange = async () => {
        //console.log("inside input onchange");
        const file = input.files[0];
        let data = new FormData();
        data.append("model-file", file);
        if (file.name.endsWith(".zip")) {
          // When uploading a zip file, ask for the main design file in the archive
          const entrypoint = window.prompt(
            "Please enter the filename of the main design inside the archive."
          );
          data.append("model-zip-entrypoint", entrypoint);
        }
        upload.setAttribute("disabled", "true");
        models.setAttribute("disabled", "true");
        showNotification(
          `Uploading model <em>${file.name}</em>. Do not reload the page.`
        );
        try {
          //console.log("inside try block");
          const resp = await fetch("http://localhost:8080/model/api/models", {
            method: "POST",
            body: data,
          });
          if (!resp.ok) {
            //console.log("resp.ok error");
            throw new Error(await resp.text());
          }
          const model = await resp.json();
          setupModelSelection(viewer, model.urn);
        } catch (err) {
          //console.log("catch error");
          alert(
            `Could not upload model ${file.name}. See the console for more details.`
          );
          console.error(err);
        } finally {
          clearNotification();
          upload.removeAttribute("disabled");
          models.removeAttribute("disabled");
          input.value = "";
        }
      };
    }

    async function onModelSelected(viewer, urn) {
      if (window.onModelSelectedTimeout) {
        clearTimeout(window.onModelSelectedTimeout);
        delete window.onModelSelectedTimeout;
      }
      window.location.hash = urn;
      try {
        const resp = await fetch(
          `http://localhost:8080/model/api/models/${urn}/status`
        );
        if (!resp.ok) {
          //console.log("resp.ok error status");
          throw new Error(await resp.text());
        }
        const status = await resp.json();
        switch (status.status) {
          case "n/a":
            showNotification(`Model has not been translated.`);
            break;
          case "inprogress":
            showNotification(
              `Model is being translated (${status.progress})...`
            );
            window.onModelSelectedTimeout = setTimeout(
              onModelSelected,
              5000,
              viewer,
              urn
            );
            break;
          case "failed":
            showNotification(
              `Translation failed. <ul>${status.messages
                .map((msg) => `<li>${JSON.stringify(msg)}</li>`)
                .join("")}</ul>`
            );
            break;
          default:
            clearNotification();
            loadModel(viewer, urn);
            break;
        }
      } catch (err) {
        alert("Could not load model. See the console for more details.");
        console.error(err);
      }
    }

    function showNotification(message) {
      const overlay = document.getElementById("map-overlay");
      overlay.innerHTML = `<div class="notification">${message}</div>`;
      overlay.style.display = "flex";
    }

    function clearNotification() {
      const overlay = document.getElementById("map-overlay");
      overlay.innerHTML = "";
      overlay.style.display = "none";
    }
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: loading ? "block" : "none", padding: "1rem" }}>
        Loading ...
      </div>
      <div style={{ position: "relative" }}>
        <div id="header">
          <select name="models" id="map-models"></select>
          <button id="map-upload" title="Upload New Model">
            Upload
          </button>
          <input type="file" id="map-input" />
        </div>
        <div
          id="map-preview"
          style={{
            width: "90vw",
            height: "80vh",
            position: "absolute",
            left: "65px",
            top: "150px",
          }}
        ></div>
      </div>
      <div id="map-overlay"></div>
    </div>
  );
};

export default MapViewer;
