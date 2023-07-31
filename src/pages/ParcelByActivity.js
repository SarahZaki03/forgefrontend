import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import ParcelDetailsRow from "../components/ParcelDetailsRow.js/ParcelDetailsRow";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Location from "../images/map.png";
import { Link } from "react-router-dom";

import { fetchParcelByActivity } from "../services/api";

import axios from "axios";

/**
 * 
 *  Response
    {
        {   
            "id":int,
            "Geom":points[],
            "isReserved":bool,
            "image":byte[],
            "parcelActivityId":int,
            "meterPrice":deicmal,
            "landNumber":int,
            "districtName":string,
            "netLandArea":decimal,
            "grossLandArea":decimal,
            "financialLandArea":decimal,
            "uniqueCode":int
        },
        // The rest of the parcel list.
    }

 */

const ParcelByActivity = () => {
  const params = useParams();
  const [parcels, setParcels] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchParcelByActivity(params.landId);
  //     console.log(response);
  //     setParcels(response);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    axios
      // .post("http://192.168.1.34:8070/api/ParcelActivityTypes/GetAllActivities")
      .get(`http://localhost:8080/events/parcels/${params.landId}`)
      .then((data) => {
        setParcels(data.data.parcels.parcels);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="m-auto mt-5" style={{ width: "85%" }}>
        <Typography sx={{ mt: 5 }} variant="h4" gutterBottom>
          {params.name}
        </Typography>

        {parcels.length
          ? parcels.map((parcel, index) => (
              <ParcelDetailsRow
                key={index}
                actid={params.landId}
                parcel={parcel}
                id={parcel.id}
                user={false}
              />
            ))
          : "No Parcels For the Selected Activity"}
      </div>
    </div>
  );
};

export default ParcelByActivity;
