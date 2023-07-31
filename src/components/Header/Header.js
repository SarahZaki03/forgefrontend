import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/map.svg";
import Nav from "react-bootstrap/Nav";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { AppBar, IconButton, Menu, Toolbar } from "@mui/material";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const Header = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = getToken();
    setToken(token);
  }, []);

  const [userState, setUserState] = useState(true);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const userId = 3;
  // You must replace the userId value here, and let the react get the value
  // of the userid using the axios login
  let userReqPagePath = `/userrequests/${userId}`;

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeUserStatus = () => {
    setUserState((prevState) => !prevState);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          spacing={1}
          padding={2}
          sx={{ bgcolor: "primary.main", m: "auto" }}
        >
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <Link to="/">
                <img src={logo} width={150} />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                color: "primary.contrastText",
                pt: 2,
              }}
            >
              <Nav className="map-main-nav justify-content-center font-weight-bold">
                <Link
                  to="/"
                  className="text-white text-decoration-none mx-3 py-2"
                >
                  Home
                </Link>
                <Link
                  to="/map"
                  className="text-white text-decoration-none mx-3 py-2"
                >
                  Map
                </Link>
                <Link
                  to="/mapbox"
                  className="text-white text-decoration-none mx-3 py-2"
                >
                  Register New Structure
                </Link>
                {/* <Link
                to="/contact"
                className="text-white text-decoration-none mx-3 py-2"
              >
                Contact Us
              </Link> */}
                {!token && (
                  <Link
                    to="/auth"
                    className="text-white text-decoration-none mx-3 py-2"
                  >
                    Sign in
                  </Link>
                )}
              </Nav>
            </Box>
          </Grid>
          {auth && (
            <Grid
              item
              xs={12}
              sm={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                sx={{ color: "primary.contrastText", minWidth: "fit-content" }}
              >
                <div>
                  <IconButton
                    size="large"
                    aria-label="search"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <SearchIcon />
                  </IconButton>
                  {token && (
                    <>
                      <IconButton
                        size="large"
                        aria-label="notification icon"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <NotificationsIcon />
                      </IconButton>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <PersonIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                        <MenuItem>
                          <ListItemText inset>Parcels Status</ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <Check sx={{ color: "green" }} />
                          </ListItemIcon>
                          Parcel 122: Approved
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <RotateLeftIcon sx={{ color: "orange" }} />
                          </ListItemIcon>
                          Parcel 342: InPrograss
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <RotateLeftIcon sx={{ color: "orange" }} />
                          </ListItemIcon>
                          Parcel 342: InPrograss
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <SmsFailedIcon color="error" />
                          </ListItemIcon>
                          Parcel 123: Rejected
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <ListItemText>
                            <Link
                              to={userReqPagePath}
                              className="text-decoration-none text-black"
                            >
                              My Requests
                            </Link>
                          </ListItemText>
                        </MenuItem>
                        <MenuItem>
                          <ListItemText>Settings</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <Form action="/logout" method="post">
                            <button className="border-0 bg-white">
                              Logout
                            </button>
                          </Form>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </div>
              </Box>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
