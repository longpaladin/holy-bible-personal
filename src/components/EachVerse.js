
import { useState } from "react";
import { favouriteVerses } from "../firebase";
import { Modal } from "./Modal";

export function EachVerse({ text, index, book, chapter }) {
const [openModal, setOpenModal] = useState(false);

  const changeBackgroundColor = (e) => {
    e.target.style.background = "#385779";
    e.target.style.color = "white";
  };

  const changeToOriginal = (e) => {
    e.target.style.background = "white";
    e.target.style.color = "black";
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
        setOpenModal(true);
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
    </p><Modal open={openModal} close={()=>setOpenModal(false)}/>
    </div>
    
  );
}
