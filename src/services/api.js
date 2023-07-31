import axios from "axios";
import { getAuthToken } from "../util/auth";

export const getForgeAccessToken = async () => {
  const response = await axios.get("http://localhost:8080/forge/token");
  return response.data;
};

export const getForgeModel = async () => {
  const response = await axios.get("http://localhost:8080/model/api/models");
  return response.data;
};

// /api/models/:urn/status
export const getForgeModelStatus = async (urn) => {
  const response = await axios.get(
    `http://localhost:8080/model/api/models/${urn}/status`
  );
  return response.data;
};

export const getUrn = async (data) => {
  const resp = await fetch("http://localhost:8080/model/api/models", {
    method: "POST",
    body: data,
  });
  if (!resp.ok) {
    throw new Error(await resp.text());
  }
  const model = await resp.json();
  return model.urn;
};

/**
 * 
 * The router will handle 3 types of requests:

    GET /api/models - when the client wants to get the list of all models available for viewing
    GET /api/models/:urn/status - used to check the status of the conversion (incl. error messages if there are any)
    POST /api/models - when the client wants to upload a new model and start its translation
 */

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export const fetchActivities = async () => {
  const response = await axios.get("https://api.example.com/users");
  return response.data;
};

export const fetchParcelByActivity = async (id) => {
  console.log("id", id);
  const response = await axios.get(
    // "http://192.168.1.34:8070/api/Parcels/GetParcelsByActivityId",
    "http://localhost:8080/events/parcels/" + id
  );
  console.log(response);
  return response.data;
};

export const fetchParcelDetails = async (parcelId) => {
  const response = await axios.post(
    `http://192.168.1.34:8070/api/Parcels/GetParcelDetailsWithFilenameAndPath?id=${parcelId}`
  );
  return response.data;
};

export const requestParcel = async (parcelId) => {
  // Axios Post
};

export const fetchUserRequests = async (userId) => {
  const token = getAuthToken();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get("https://api.example.com/users", {
    headers,
  });
  return response.data;
};
