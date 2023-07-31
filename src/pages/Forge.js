import React from "react";
import { useState, useEffect } from "react";
import { getForgeAccessToken } from "../services/api";
import { getForgeModel, getForgeModelStatus } from "../services/api";
import { ForgeViewer } from "@lagarsoft/forge-viewer-react";
import Header from "../components/Header/Header";

import axios from "axios";

const Forge = () => {
  const [token, setToken] = useState("");
  const [urn, setURN] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getForgeAccessToken();
      console.log(response);
      setToken(response.access_token);

      const secondResponse = await getForgeModel();
      console.log(secondResponse);
    };

    fetchData();
  }, []);

  const handleFileUpload = (event) => {
    console.log("start");
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("model-file", file);
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post("http://localhost:8080/model/api/models", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        // handle the response
        console.log(response);
        setURN(`urn: ${response.data.urn}`);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <label>Upload File</label>
        <input type="file" onChange={handleFileUpload} />
        <div style={{ width: "80%" }}>
          <ForgeViewer urn={urn} accessToken={token} />
        </div>
      </div>
    </div>
  );
};

export default Forge;
