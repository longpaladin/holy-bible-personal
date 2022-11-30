import * as React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import {auth} from "../firebase"

export function NewUserForm({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function createUser(e, email, password) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Paper
      elevation={0}
      sx={{ minHeight: "100vh", backgroundColor: "rgba(211,211,211,0.2)" }}
    >
      <Box sx={{ textAlign: "center", float: "left", width: "70%", mt: 20 }}>
        <Box component="h1" sx={{ mb: 4 }}>
          New User
        </Box>
        <Box
          component="form"
          sx={{
            m: 0,
            width: "100%",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => createUser(e, email, password)}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: "60%", m: 1 }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="small"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ width: "60%", m: 1 }}
          />

          <Tooltip title="Login">
            <Button
              size="large"
              variant="contained"
              type="submit"
              sx={{
                width: "60%",
                m: 1,
                backgroundColor: "#283e56",
                "&:hover": { backgroundColor: "#385779" },
              }}
            >
              <LoginOutlinedIcon sx={{ color: "white" }} />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}
