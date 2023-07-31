import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function DenseMenu() {
  const userId = 3;
  // You must replace the userId value here, and let the react get the value
  // of the userid using the axios login
  let userReqPagePath = `/userrequests/${userId}`;

  return (
    <Paper sx={{ width: 220 }}>
      <MenuList dense>
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
            <Link to={userReqPagePath}>My Requests</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
