import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";


export function NavBarTab({ linkToPage, icon, text }) {
  return (
    <NavLink
      to={linkToPage}
      style={({ isActive }) => {
        return {
          textDecoration: "none",
          color: "white",
          fontStyle: isActive ? "italic" : "normal",
          textTransform: isActive ? "uppercase" : "none",
        };
      }}
    >
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            "&:hover": { backgroundColor: "#385779" },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{ fontSize: "14px" }}
          />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}
