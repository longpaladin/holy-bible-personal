import { forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { get, remove } from "firebase/database";
import { deleteVerse, retrieveFavouriteVerses } from "../firebase";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function DeleteFavouriteVerse({favourite}) {
  const [open, setOpen] = useState(false);

const checkForDeletion = () => {
    get(retrieveFavouriteVerses()).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let uniqueIdOfVerse = childSnapshot.ref._path.pieces_[2];
        if ( // I wanted to compare object to object but it didn't work
          childSnapshot.val().book === favourite.book &&
          childSnapshot.val().chapter === favourite.chapter &&
          childSnapshot.val().verse === favourite.verse &&
          childSnapshot.val().text === favourite.text
        ) { // because component will dismount, snackbar doesn't appear when I delete the last verse at the bottom
          setOpen(true);
          remove(deleteVerse(uniqueIdOfVerse));
        }
      });
    });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => {

        checkForDeletion();
      }}>
        <RemoveCircleOutlineIcon />
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Verse deleted!
        </Alert>
      </Snackbar>
    </>
  );
}
