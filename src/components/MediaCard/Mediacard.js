import * as React from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function MediaCard(props) {
  const navigate = useNavigate();

  const gotoParcelByActivity = () => {
    navigate(`lands/${props.activityId}/${props.title}`);
  };

  return (
    <Card sx={{ maxWidth: 345, p: 2, borderRadius: 4, boxShadow: 3 }}>
      <CardMedia
        sx={{ height: 240, borderRadius: 4 }}
        image={props.imgsrc}
        title="green"
      />
      <CardContent>
        <CardActions sx={{ paddingInlineStart: 0 }}>
          <LocationOnIcon sx={{ color: "#ff8400" }} />
          <Link href="#" underline="none">
            {"View on maps"}
          </Link>
        </CardActions>
        <Typography
          sx={{ marginBlockStart: 1 }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ disply: "inline-flex", flexDirection: "row-reverse" }}>
        <Button size="small" variant="contained" onClick={gotoParcelByActivity}>
          View All
        </Button>
      </CardActions>
    </Card>
  );
}
