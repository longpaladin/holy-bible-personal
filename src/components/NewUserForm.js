import * as React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Paper, TextField, Tooltip } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { auth } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

export function NewUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newUserExist, setNewUserExist] = useState(false);

  function createUser(e, email, password) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === "auth/email-already-in-use") {
          setIsLoading(false);
          setNewUserExist(true);
        }
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
          onSubmit={(e) => {
            createUser(e, email, password);
            setIsLoading(true);
            setNewUserExist(false);
          }}
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

          <Tooltip title="Create account">
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
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <LoginOutlinedIcon sx={{ color: "white" }} />
              )}
            </Button>
          </Tooltip>
        </Box>
        {newUserExist && (
          <p style={{ color: "red" }}>User/email already exist. Please try another email.</p>
        )}
      </Box>
    </Paper>
  );
}
