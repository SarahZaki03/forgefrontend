import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Header from "../components/Header/Header";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import arLocale from "i18n-iso-countries/langs/ar.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import UploadFileIcon from "@mui/icons-material/UploadFile";

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const countryObj = countries.getNames("en", { select: "official" });
const countryArr = Object.entries(countryObj).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

function createData(name, value) {
  return { name, value };
}

const rows = [
  createData("Land Number", "K7"),
  createData("Area", "R8"),
  createData("Length", "00"),
];

const Requestform = () => {
  // const params = useParams();
  // {params.parcelId}
  const [files, setFiles] = useState([]);

  const onFileUpload = () => {
    const newFile = document.getElementById("file");
    setFiles((oldFiles) => [...oldFiles, newFile.files[0]]);
    newFile.value = "";
  };

  const deleteFile = (index) => {
    setFiles((files) => files.filter((_, idx) => idx !== index));
  };

  const previewFile = (index) => {
    // preview
  };

  const requestParcel = () => {
    // Request Parcel
  };

  const parcel = {
    attachments: [
      { name: "Project description pdf file", path: "/path" },
      {
        name: "Firm description and objective pdf file",
        path: "/path",
      },
      {
        name: "Rvt or ifc file for displaying the building",
        path: "/viewer",
      },
    ],
  };

  return (
    <div>
      <Header />
      <Grid
        sx={{
          width: "80%",
          margin: "4rem auto",
          p: 1,
          border: "1px solid #d3d3d3",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <Item>
              <InputLabel
                sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 3 }}
              >
                Personal Details
              </InputLabel>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                defaultValue="Full Name"
                helperText="Required Field"
                sx={{ my: 2 }}
              />
              {/* <TextField
              fullWidth
              select
              label="Country"
              defaultValue="AR"
              sx={{ my: 2 }}
            >
              {countryArr.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                defaultValue="National ID Number"
                sx={{ my: 2 }}
              />
            </Item>
            <Item>
              <InputLabel
                sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 3 }}
              >
                Contact Information
              </InputLabel>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                defaultValue="Email"
                helperText="Required Field"
                sx={{ my: 2 }}
              />
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                defaultValue="Phone"
                sx={{ my: 2 }}
              />
            </Item>
          </Grid>
          <Grid item xs={6} sx={{ mb: 4 }}>
            <Item>
              <InputLabel
                sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 3 }}
              >
                Land Details
              </InputLabel>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <FormGroup>
                <Link href="#" sx={{ my: 1 }}>
                  {"terms and conditions"}
                </Link>
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="I have read and agree to the website terms and conditions"
                />
              </FormGroup>
              <p>
                Your password data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in out
                <Button variant="text" size="small">
                  privacy policy
                </Button>
              </p>
            </Item>
          </Grid>
        </Grid>
        <Divider>Attachments</Divider>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ p: 3 }}>
            {/* <UploadFileIcon sx={{ fontSize: "7rem", color: "#ededed" }} /> */}
            <InputLabel sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 2 }}>
              Required Attachments
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
                              open file sample
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
          </Grid>
          <Grid item xs={6}>
            {files.length ? (
              <Item>
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
                        {/* <ListItemText
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
                        </ListItemText> */}
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
              </Item>
            ) : (
              " "
            )}

            <Item>
              <InputLabel
                sx={{ fontWeight: "bold", fontSize: "1.4rem", my: 3 }}
              >
                Attachments
              </InputLabel>
              <TextField
                required
                fullWidth
                id="file"
                type="file"
                name="file"
                helperText="Upload all required attachments"
              />
            </Item>
            <Item sx={{ textAlign: "center" }}>
              <Button variant="outlined" size="small" onClick={onFileUpload}>
                Upload Attachment
              </Button>
            </Item>
          </Grid>
        </Grid>
        <Grid>
          <Item sx={{ textAlign: "center" }}>
            <Button onClick={requestParcel} variant="contained" size="large">
              Request
            </Button>
          </Item>
        </Grid>
      </Grid>
      <div style={{ height: "75px" }}></div>
    </div>
  );
};

export default Requestform;
