import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ParcelDetailsRow from "../components/ParcelDetailsRow.js/ParcelDetailsRow";
import { Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserRequests = () => {
  const params = useParams();
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    // axios.get("https://jsonplaceholder.typicode.com/users").then((data) => {
    //   setParcels(data?.data); // a safe navigation operator (?.) in JavaScript
    // });
    axios
      .get(`http://localhost:8080/events/parcels/${params.userId}`)
      .then((data) => {
        setParcels(data.data.parcels.parcels);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="m-auto mt-5" style={{ width: "85%" }}>
        <Typography sx={{ mt: 5 }} variant="h4" gutterBottom>
          My Requests
        </Typography>

        {parcels.length > 0 ? (
          parcels.map((parcel, index) => (
            <ParcelDetailsRow
              key={index}
              parcel={parcel}
              actid="3"
              id={parcel.id}
              user={true}
            />
          ))
        ) : (
          <Typography
            sx={{ mt: 5, color: "GrayText" }}
            variant="h5"
            gutterBottom
          >
            No Parcels Founded
          </Typography>
        )}
      </div>
    </div>
  );
};

export default UserRequests;
