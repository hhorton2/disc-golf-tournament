import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Disc Golf Tournament App
        </Typography>
        <Link
          to="/signup"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
            borderStyle: "hidden hidden solid hidden",
            borderColor: "white",
          }}
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
            borderStyle: "hidden hidden solid hidden",
            borderColor: "white",
          }}
        >
          Login
        </Link>
        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
            borderStyle: "hidden hidden solid hidden",
            borderColor: "white",
          }}
        >
          Profile
        </Link>
        <Link
          to="/team/create"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
            borderStyle: "hidden hidden solid hidden",
            borderColor: "white",
          }}
        >
          Create Team
        </Link>
        <Link
          to="/team/list"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
            borderStyle: "hidden hidden solid hidden",
            borderColor: "white",
          }}
        >
          View Teams
        </Link>
        <Link
          to="/team/2"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "10px",
            borderStyle: "hidden hidden solid hidden",
            borderColor: "white",
          }}
        >
          Team Detail
        </Link>
      </Toolbar>
    </AppBar>
  );
}
