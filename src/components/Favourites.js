import { Divider, Paper } from "@mui/material";
import { onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { retrieveFavouriteVerses } from "../firebase";
import { DeleteFavouriteVerse } from "./DeleteFavouriteVerse";

export function Favourites({ setDisplayCards }) {
  const [verses, setVerses] = useState([]);
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



  return (
    <div>
      <h2 style={{ padding: "30px" }}>Your favourite verses</h2>
      <Paper
        elevation={6}
        sx={{
          m: 3,
          maxHeight: "70vh",
          overflow: "auto",
          p: 4,
        }}
      >
        {verses.length === 0 ? (
          <p>You have no favourite verses! Go find some!</p>
        ) : (
          verses.map((favourite, index) => (
            <>
              <h3>
                {favourite.book} {favourite.chapter} <DeleteFavouriteVerse favourite={favourite}/>
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
                key={index}
              >
                <sup>
                  <b>{favourite.verse}</b>
                </sup>
                {favourite.text}
              </p>

              <br />
            </>
          ))
        )}
      </Paper>
    </div>
  );
}
