import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

    const loginUser = (e, email, password) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            setIsLoading(false);
            setWrongPassword(true);
          }
          if (error.code === "auth/user-not-found") {
            setIsLoading(false);
            setUserNotFound(true);
          }
          if (error.code === "auth/invalid-email") {
            setIsLoading(false);
            setInvalidEmail(true);
          }
        });
    };

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: "100vh",
        backgroundColor: "rgba(211,211,211,0.2)",
        minWidth: "80vw",
      }}
    >
      <Box sx={{ textAlign: "center", float: "left", width: "100%", mt: 20 }}>
        <Box component="h1" sx={{ mb: 4 }}>
          Login
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
            loginUser(e, email, password);
            setIsLoading(true);
            setWrongPassword(false);
            setUserNotFound(false);
          }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            id="login-email"
            label="Email"
            variant="outlined"
            sx={{ width: "60%", m: 1 }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="small"
            id="login-password"
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
        {wrongPassword && (
          <p style={{ color: "red" }}>Wrong password. Please try again.</p>
        )}
        {userNotFound && (
          <p style={{ color: "red" }}>
            User does not exist. Please create an account.
          </p>
        )}
        {invalidEmail && (
          <p style={{ color: "red" }}>Invalid email. Please try again.</p>
        )}
      </Box>
    </Paper>
  );
}
