import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Navigate, Outlet } from "react-router-dom";
import { NavBarTab } from "./NavBarTab";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import logo from "../images/holybible_logo.png";
import { LogoutTab } from "./LogoutTab";

export function HomePage({ user }) {
  if (!user) {
    return <Navigate to="/" />;
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
              linkToPage="readthebible"
              icon={<MenuBookOutlinedIcon sx={{ color: "white" }} />}
              text="Read the bible"
            />
            <NavBarTab
              linkToPage="studybybooks"
              icon={<CollectionsBookmarkOutlinedIcon sx={{ color: "white" }} />}
              text="Study by books"
            />
            <NavBarTab
              linkToPage="favourites"
              icon={<ThumbUpIcon sx={{ color: "white" }} />}
              text="Favourites"
            />
            <LogoutTab />
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
