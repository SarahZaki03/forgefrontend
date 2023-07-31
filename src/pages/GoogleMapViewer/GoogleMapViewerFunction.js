/* global Autodesk, THREE */
import { getForgeAccessToken } from "./../../services/api";
import { getUrn } from "./../../services/api";

export async function init(urn) {
  const data = await getForgeAccessToken();
  const options = {
    env: "AutodeskProduction",
    accessToken: data.access_token,
    isAEC: true,
  };
  Autodesk.Viewing.Initializer(options, () => {
    const div = document.getElementById("google-map-viewer");

    const config = { extensions: ["GoogleMapsExtension"] };

    const viewer = new Autodesk.Viewing.GuiViewer3D(div, config);
    viewer.start();
    viewer.setTheme("light-theme");
    Autodesk.Viewing.Document.load(`urn:${urn}`, (doc) => {
      //   var viewables = doc.getRoot().getDefaultGeometry();
      let viewables = doc.getRoot().search({ role: "3d", type: "geometry" })[1];
      viewer.loadDocumentNode(doc, viewables).then(onLoadFinished);
    });
  });
  function onLoadFinished() {
    console.log("Finished");
  }
}

export async function setupModelUpload(file) {
  file = file.files[0];
  let data = new FormData();
  data.append("model-file", file);
  const result = await getUrn(data);
  console.log(result);
  init(result);
  return result;
}
