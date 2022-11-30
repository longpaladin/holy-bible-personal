import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Navigate } from "react-router-dom";

export function CardsDisplay({ picture }) {
  const imageRef = ref(storage, picture);
  const [urlName, setUrlName] = useState("");
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    let tempValue = picture.split("-");
    let photoName = tempValue[2];
    let finalName = photoName.slice(0, photoName.indexOf("."));
    if (isNaN(finalName[0])) {
      finalName = finalName[0].toUpperCase() + finalName.slice(1);
    } else {
      let firstNumber = finalName[0];
      finalName = finalName.slice(1);
      finalName = finalName[0].toUpperCase() + finalName.slice(1);
      finalName = firstNumber + " " + finalName;
    }
    setBookName(finalName);

    getDownloadURL(imageRef)
      .then((url) => {
        setUrlName(url);
      })
      .catch((err) => {
        console.log("unable to download url", err);
      });
  }, [picture]);

  return (
    <Card sx={{ maxWidth: 280 }}>
      <CardActionArea onClick={() => <Navigate to="readthebible" />}>
        <CardMedia component="img" height="150" src={urlName} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {bookName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
