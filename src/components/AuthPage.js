import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Navigate, Outlet } from "react-router-dom";
import { NavBarTab } from "./NavBarTab";
import logo from "../images/holybible_logo.png";

export function AuthPage({ user }) {
  if (user) {
    return <Navigate to="readthebible" />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: "20vw",
          maxWidth: "20vw",
          float: "left",
        }}
      >
        <AppBar
          position="static"
          sx={{ minHeight: "100vh", padding: 0, backgroundColor: "#283e56" }}
        >
          <Toolbar sx={{ flexGrow: 1, flexDirection: "column" }} disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ m: 0, p: 0 }}
            >
              <Box component="img" src={logo} sx={{ maxWidth: "100%" }} />
            </IconButton>
            <NavBarTab
              linkToPage="newuser"
              icon={<PersonIcon sx={{ color: "white" }} />}
              text="New User"
            />
            <NavBarTab
              linkToPage="login"
              icon={<LoginOutlinedIcon sx={{ color: "white" }} />}
              text="Login"
            />
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
