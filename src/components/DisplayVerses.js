import { useCallback, useEffect, useState } from "react";
// import { Reference } from "biblejs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import { versesCount } from "../bible_versions/verses";

//Author of npm library: bricejlin (holy bible text) KJV and ASV only
import bible from "holy-bible";
import { EachVerse } from "./EachVerse";

//Author of npm library: davewasmer (parser reference), useless because I cannot get the number of verses per chapter of different books
// const Bible = require("biblejs");
// let Reference = Bible.Reference;

//Author of npm library: openbibleinfo, very difficult to understand, and it's just a parser, not the biblical text
// let bcv_parser = require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;
// let bcv = new bcv_parser;

export function DisplayVerses() {
  const [version, setVersion] = useState("KJV");
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(null);
  const [printText, setPrintText] = useState([]);
  const [input, setInput] = useState("");

  const formatVerse = (verseNumber, text) => `${verseNumber} ${text}`;

  const fetchVerses = useCallback(async () => {
    if (!book || !chapter || !version) return;

    const newPrintText = [];
    if (verse) {
      const { text } = await bible.get(`${book}.${chapter}.${verse}`, version);
      newPrintText.push(formatVerse(verse, text));
    } else {
      const verseCount = computeVerseCount(book, chapter);
      const verses = await Promise.all(
        new Array(verseCount).fill(null).map(async (_, index) => {
          const { text } = await bible.get(
            `${book}.${chapter}.${index + 1}`,
            version
          );
          return text;
        })
      );
    
      verses.forEach((verse, index) =>
        newPrintText.push(formatVerse(index + 1, verse))
      );
    }

    setPrintText(newPrintText);
  }, [book, chapter, verse, version]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [book, chapter, verse] = input.split(".");
    setBook(book);
    setChapter(chapter);
    setVerse(verse);
  };

  const computeVerseCount = (book, chapter) => {
    return Array.isArray(versesCount[book])
      ? +versesCount[book][chapter - 1]
      : 0;
  };

  useEffect(() => {
    fetchVerses();
  }, [fetchVerses]);

  return (
    <Paper
      elevation={0}
      sx={{ minHeight: "100vh", backgroundColor: "rgba(211,211,211,0.2)" }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 3, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => setInput(e.target.value)}
          size="small"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          helperText="Search in this format: 1 John.3 (book & chapter) 1 John.3.1 (book & chapter & verse)"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Bible version</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={version}
            label="Bible version"
            onChange={(e) => setVersion(e.target.value)}
          >
            <MenuItem value="KJV">King James Version (KJV)</MenuItem>
            <MenuItem value="ASV">American Standard Version (ASV)</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Search">
          <Button
            variant="contained"
            type="submit"
            sx={{
              maxWidth: "10ch",
              backgroundColor: "#283e56",
              "&:hover": { backgroundColor: "#385779" },
            }}
          >
            <SearchIcon />
          </Button>
        </Tooltip>
      </Box>

      <Paper
        elevation={6}
        sx={{
          m: 3,
          maxHeight: "70vh",
          overflow: "auto",
          p: 4,
        }}
      >
        <h1>
          {book} {chapter}
        </h1>
        <Divider />
        {printText.map((text, index) => (
          <EachVerse key={index} text={text} index={index} book={book} chapter={chapter} verse={verse}/>
        ))}
      </Paper>
    </Paper>
  );
}
