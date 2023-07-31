import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapPolygon from "../components/MapPolygon";
import { Button, Typography, InputLabel, Paper } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const Parcel = (props) => {
  const [token, setToken] = useState(null);
  const [parcel, setParcel] = useState([]);
  const [polygon, setPolygon] = useState([
    [30.029025894741707, 31.758735477391582],
    [30.029025894741707, 31.758735477391582],
  ]);

  useEffect(() => {
    // if (!data) return;
    axios
      .get(
        `http://localhost:8080/events/parcels/${params.landId}/${params.parcelId}`
      )
      .then((data) => {
        console.log(data.data.parcel.geom);
        setParcel(() => data.data.parcel);
        setPolygon(data.data.parcel.geom);
      });

    const token = getToken();
    setToken(token);
  }, []);

  const params = useParams();
  // {params.parcelId}
  const center = [
    (30.029025894741707 + 30.031594984790928) / 2,
    (31.758735477391582 + 31.76122288732816) / 2,
  ];
  const zoom = 16;

  const navigate = useNavigate();

  const requestParcel = () => {
    console.log(params.parcelId);
    navigate(`/requestform/${params.parcelId}`);
  };

  const goToSignIn = () => {
    navigate(`/auth`);
  };

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("Metter Price", parcel.meterPrice),
    createData("Land Number", parcel.landNumber),
    createData("District Name", parcel.districtName),
    createData("Area", parcel.netLandArea),
    createData("Gross Land Area", parcel.grossLandArea),
    createData("Financial Land Area", parcel.financialLandArea),
    createData("Length", "00"),
    createData("Unique Code Of Parcel", parcel.uniqueCode),
  ];

  return (
    <div>
      <Header />
      <Container fluid className="p-0">
        <Row className="m-0 w-100">
          <Col className="p-4">
            <Typography
              sx={{
                backgroundColor: grey[100],
                borderRadius: 2,
                p: 1,
                fontFamily: "monospace",
              }}
              variant="h6"
              gutterBottom
            >
              20 Km Away From Center
            </Typography>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 2 }}>
              Land Details
            </InputLabel>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ p: 1 }} component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ p: 1 }} align="right">
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <InputLabel sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 2 }}>
              List of Attachments
            </InputLabel>
            {parcel.attachments ? (
              <nav aria-label="secondary mailbox folders">
                <List>
                  {parcel.attachments.map((attachment) => {
                    return (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary={attachment.name} />
                          <a href={attachment.path} target="_blank">
                            <Button variant="outlined" size="small">
                              open file
                            </Button>
                          </a>
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </nav>
            ) : (
              <div> No Attacments </div>
            )}

            {token && (
              <Button
                sx={{ letterSpacing: 1, mt: 2 }}
                size="medium"
                variant="contained"
                onClick={requestParcel}
              >
                Request For This Parcel
              </Button>
            )}
            {!token && (
              <Button
                sx={{ letterSpacing: 1, mt: 2 }}
                size="medium"
                variant="contained"
                onClick={goToSignIn}
              >
                Sign In to Request This Parcel
              </Button>
            )}
          </Col>
          <Col className="p-0">
            <MapPolygon
              center={center}
              zoom={zoom}
              polygon={polygon}
              height={"90vh"}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Parcel;
