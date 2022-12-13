import { Divider, Paper, Snackbar } from "@mui/material";
import { onValue } from "firebase/database";
import { forwardRef, useEffect, useState } from "react";
import { retrieveFavouriteVerses } from "../firebase";
import { DeleteFavouriteVerse } from "./DeleteFavouriteVerse";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Favourites({ setDisplayCards }) {
  const [verses, setVerses] = useState([]);
  const [open, setOpen] = useState(false);
  setDisplayCards(true);

  useEffect(() => {
    onValue(retrieveFavouriteVerses(), (snapshot) => {
      const newMessages = [];
      snapshot.forEach((childSnapshot) => {
        newMessages.push(childSnapshot.val());
      });
      setVerses(newMessages);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{ width: "75vw" }}>
      <h2 style={{ padding: "30px" }}>Your favourite verses</h2>
      <Paper
        elevation={6}
        sx={{
          m: 3,
          maxHeight: "70vh",
          overflow: "auto",
          p: 4,
          width: "100%",
        }}
      >
        {verses.length === 0 ? (
          <p>You have no favourite verses! Go find some!</p>
        ) : (
          verses.map((favourite) => (
            <div
              key={`${favourite.book}.${favourite.chapter}.${favourite.verse}`}
            >
              <h3>
                {favourite.book} {favourite.chapter}{" "}
                <DeleteFavouriteVerse
                  favourite={favourite}
                  displayDeleteSnackbar={() => {
                    setOpen(true);
                  }}
                />
              </h3>

              <Divider />
              <p
                style={{
                  textAlign: "left",
                  margin: "0px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  fontSize: "12px",
                }}
              >
                <sup>
                  <b>{favourite.verse}</b>
                </sup>
                {favourite.text}
              </p>

              <br />
            </div>
          ))
        )}
      </Paper>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Verse deleted!
        </Alert>
      </Snackbar>
    </div>
  );
}
