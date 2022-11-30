import { ref, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { storage } from "../firebase";
import { CardsDisplay } from "./CardsDisplay";

export function BibleBooks({ user }) {

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
    <div>
      {filesFromStorage.map((file, index) => (
        <div key={index} style={{ float: "left", padding: "10px" }}>
          <CardsDisplay picture={file} />
        </div>
      ))}
    </div>
  );
}
