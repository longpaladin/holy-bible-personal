import { Paper } from "@mui/material";
import { ref, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../firebase";
import { CardsDisplay } from "./CardsDisplay";

export function BibleBooks({ displayCards, setDisplayCards }) {
  const [filesFromStorage, setFilesFromStorage] = useState([]);

  useEffect(() => {
    getFiles();
  }, []);

  function getFiles() {
    const filesRef = ref(storage, "images");
    listAll(filesRef)
      .then(({ items }) => {
        const files = items.map((item) => item.fullPath);
        setFilesFromStorage(files);
      })
      .catch((err) => {
        console.log("Could not download files", err);
      });
  }

  return (
    <div style={{ minWidth: "80vw", minHeight: "100vh" }}>
      <h2 style={{ padding: "30px" }}>Learn more about each book</h2>
      {displayCards && (
        <Paper
        elevation={6}
        sx={{
          m: 3,
          maxHeight: "80vh",
          overflow: "auto",
          p: 4,
        }}
      ><p>Source: Photos from Unsplash by Sincerely Media</p>
        {filesFromStorage.map((file, index) => (
          <div key={index}>
            <CardsDisplay
              picture={file}
              setDisplayCards={setDisplayCards}
            />
          </div>
        ))}
        
      </Paper>
      
      )}
      

      <Outlet />
    </div>
  );
}
