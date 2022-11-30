import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import {auth} from "../firebase"

export function NavBarTab({ linkToPage, icon, text }){
  return (
    <NavLink to={linkToPage} style={{ textDecoration: "none", color: "white" }}>
      <ListItem disablePadding>
          <ListItemButton
            sx={{
              "&:hover": { backgroundColor: "#385779" },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ fontSize: "12px" }}
            />
          </ListItemButton>
      </ListItem>
    </NavLink>
  );
}