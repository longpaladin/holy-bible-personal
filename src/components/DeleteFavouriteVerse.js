import Button from "@mui/material/Button";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { get, remove } from "firebase/database";
import { deleteVerse, retrieveFavouriteVerses } from "../firebase";

export function DeleteFavouriteVerse({ favourite, displayDeleteSnackbar }) {
  const checkForDeletion = () => {
    get(retrieveFavouriteVerses()).then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let uniqueIdOfVerse = childSnapshot.ref._path.pieces_[2];
        if (
          childSnapshot.val().book === favourite.book &&
          childSnapshot.val().chapter === favourite.chapter &&
          childSnapshot.val().verse === favourite.verse &&
          childSnapshot.val().text === favourite.text
        ) {
          displayDeleteSnackbar();
          remove(deleteVerse(uniqueIdOfVerse));
        }
      });
    });
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          checkForDeletion();
        }}
      >
        <RemoveCircleOutlineIcon />
      </Button>
    </>
  );
}
