

import { favouriteVerses } from "../firebase";
import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function EachVerse({ text, index, book, chapter }) {

const [open, setOpen] = React.useState(false);

  const changeBackgroundColor = (e) => {
    e.target.style.background = "#385779";
    e.target.style.color = "white";
  };

  const changeToOriginal = (e) => {
    e.target.style.background = "white";
    e.target.style.color = "black";
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
        }}
        key={index}
        onMouseOver={changeBackgroundColor}
        onMouseLeave={changeToOriginal}
        onClick={(e) => {
          setOpen(true);
          favouriteVerses({
            book: book,
            chapter: chapter,
            verse: text.slice(0, text.indexOf(" ")),
            text: text.slice(text.indexOf(" ")),
          });
        }}
      >
        <sup>
          <b>{text.slice(0, text.indexOf(" "))}</b>
        </sup>
        {text.slice(text.indexOf(" "))}
      </p>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Saved verse in favourites!
        </Alert>
      </Snackbar>
    </div>
  );
}
