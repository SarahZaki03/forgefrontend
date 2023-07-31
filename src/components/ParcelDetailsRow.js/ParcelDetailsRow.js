import React from "react";
import { Chrono } from "react-chrono";
import "./parceldetailsrow.css";
import MapPolygon from "../MapPolygon";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const PracelDetailsRow = (props) => {
  const navigate = useNavigate();

  const goToParcelDetails = () => {
    navigate(`/parcel/${props.actid}/${props.id}`);
  };
  function createData(name, value) {
    return { name, value };
  }

  const items = [
    {
      title: "Submitted",
    },
    {
      title: "Files Format Checked",
    },
    {
      title: "Guidelines Checked",
    },
    {
      title: "Assigned To A Reviewer",
    },
    {
      title: "Approved",
    },
    {
      title: "Reserved",
    },
  ];
  const rows = [
    createData("Metter Price", props.parcel.meterPrice),
    createData("Land Number", props.parcel.landNumber),
    createData("District Name", props.parcel.districtName),
    createData("Area", props.parcel.netLandArea),
    createData("Financial Land Area", props.parcel.financialLandArea),
    createData("Unique Code Of Parcel", props.parcel.uniqueCode),
  ];
  const polygon1 = props.parcel.geom;
  const center = polygon1[0];

  return (
    <div>
      <Grid
        container
        sx={{
          my: 3,
          p: 2,
          border: 1,
          borderColor: "grey.500",
          borderRadius: "15px",
          boxShadow: "0 3px 3px grey.200",
        }}
      >
        <Grid
          item
          xs={4}
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          sx={{ borderRadius: "20px" }}
        >
          <MapPolygon
            center={center}
            polygon={polygon1}
            height="250px"
            zoom="15"
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#2753a9",
              mt: 2,
            }}
          >
            {props.parcel.netLandArea}km Shopping Land
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: grey[400],
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            {props.parcel.netLandArea}km Land, 1.2km Away from the iconic tower
          </Typography>
        </Grid>
        <Grid item xs={8} sx={{ overflow: "hidden", pl: 3 }}>
          <div style={{ width: "800px", height: "120px" }}>
            <Chrono
              items={items}
              cardLess="true"
              hideControls="true"
              itemWidth="107"
              lineWidth="0"
              slideShow="true"
              disableClickOnCircle="true"
              theme={{
                primary: "#2753a9",
                titleColor: "#2753a9",
                titleColorActive: "white",
              }}
            />
          </div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <InputLabel sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Land Details
              </InputLabel>
              {rows.map((row) => (
                <li key={row.name}>
                  {row.name}: <span>{row.value}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-end">
              <Button
                sx={{ letterSpacing: 1 }}
                size="medium"
                variant="contained"
                onClick={goToParcelDetails}
              >
                Details
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default PracelDetailsRow;
