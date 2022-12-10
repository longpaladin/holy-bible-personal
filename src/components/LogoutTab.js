import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function LogoutTab() {
  return (
    <ListItemButton
      sx={{
        "&:hover": { backgroundColor: "#385779" },
      }}
      onClick={() => signOut(auth)}
    >
      <ListItemIcon>
        <LogoutOutlinedIcon sx={{ color: "white" }} />
      </ListItemIcon>
      <ListItemText
        primary="Logout"
        primaryTypographyProps={{ fontSize: "14px" }}
      />
    </ListItemButton>
  );
}
