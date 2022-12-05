import { Divider, Paper } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getBibleBook } from "../data/const";

export default function BibleBook({ setDisplayCards }) {
  let params = useParams();
  let book = getBibleBook(params.bookname);

  return (
    <div>
      <Paper
        elevation={6}
        sx={{
          m: 3,
          maxHeight: "80vh",
          overflow: "auto",
          p: 4,
        }}
      >
        <h2 style={{ paddingBottom: "10px" }}>{book.book}</h2>
        <Divider />
        <p style={{ paddingTop: "10px" }}>{book.summary}</p>
        <p>Source: easyenglish.bible</p>
        <Link to="/studybybooks" onClick={() => setDisplayCards(true)}>
          Back
        </Link>
      </Paper>
    </div>
  );
}
