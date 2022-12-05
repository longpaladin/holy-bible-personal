
import { favouriteVerses } from "../firebase";

export function EachVerse({text, index, book, chapter}){
  return (
    <p
      style={{
        textAlign: "left",
        margin: "0px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontSize: "12px",
      }}
      key={index}
      onClick={(e) => {
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
  );
}