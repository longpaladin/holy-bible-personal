import { favouriteVerses, retrieveFavouriteVerses } from "../firebase";
import { forwardRef, useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { get } from "firebase/database";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function EachVerse({
  text,
  index,
  book,
  chapter,
  updateFavourites,
  setUpdateFavourites,
}) {
  const [open, setOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [duplicateState, setDuplicateState] = useState(false);

  const changeBackgroundColor = (e) => {
    e.target.style.background = "#385779";
    e.target.style.color = "white";
    e.target.style.transform = "scale(1.01)";
    e.target.style.fontSize = "14px";
    e.target.style.borderRadius = "10px";
    e.target.style.paddingLeft = "10px";
  };

  const changeToOriginal = (e) => {
    e.target.style.background = "white";
    e.target.style.color = "black";
    e.target.style.transform = "scale(1)";
    e.target.style.fontSize = "12px";
    e.target.style.borderRadius = "0px";
    e.target.style.paddingLeft = "0px";
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setDuplicateOpen(false);
  };

  const checkForDuplicate = () => {
    console.log(updateFavourites);
    let isDuplicated = false;
    if (updateFavourites) {
      for (let i = 0; i < updateFavourites.length; i++) {
        if (
          updateFavourites[i].book === book &&
          updateFavourites[i].chapter === chapter &&
          updateFavourites[i].verse === text.slice(0, text.indexOf(" "))
        ) {
          setDuplicateState(true);
          setDuplicateOpen(true);
          isDuplicated = true;
        }
      }
    }

    if (!isDuplicated) {
      setOpen(true);

      favouriteVerses({
        book: book,
        chapter: chapter,
        verse: text.slice(0, text.indexOf(" ")),
        text: text.slice(text.indexOf(" ")),
      });
    }
  };

  return (
    <div>
      <p
        style={{
          textAlign: "left",
          margin: "0px",
          paddingTop: "10px",
          paddingBottom: "10px",
          fontSize: "12px",
          transition: "all 0.5s ease-out",
        }}
        key={index}
        onMouseOver={changeBackgroundColor}
        onMouseLeave={changeToOriginal}
        onClick={checkForDuplicate}
      >
        <sup>
          <b>{text.slice(0, text.indexOf(" "))}</b>
        </sup>
        {text.slice(text.indexOf(" "))}
      </p>
      {!duplicateState && (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Saved verse in favourites!
          </Alert>
        </Snackbar>
      )}
      {duplicateState && (
        <Snackbar
          open={duplicateOpen}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Verse saved in favourites previously!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
