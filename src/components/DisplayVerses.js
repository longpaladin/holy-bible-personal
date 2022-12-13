import { useCallback, useEffect, useState } from "react";
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
import { versesCount } from "../bibleverses/verses";

//Author of npm library: bricejlin (holy bible text) KJV and ASV only
import bible from "holy-bible";
import { EachVerse } from "./EachVerse";
import { onValue } from "firebase/database";
import { retrieveFavouriteVerses } from "../firebase";

export function DisplayVerses({ setDisplayCards }) {
  const [version, setVersion] = useState("KJV");
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(null);
  const [printText, setPrintText] = useState([]);
  const [input, setInput] = useState("");
  const [typo, setTypo] = useState(false);
  const [updateFavourites, setUpdateFavourites] = useState([]);
  const [isSearchInvalid, setIsSearchInvalid] = useState(false);

  setDisplayCards(true);

  // Guided by instructor Min Shan (angrylobster)
  const formatVerse = (verseNumber, text) => `${verseNumber} ${text}`;

  const fetchVerses = useCallback(async () => {
    // Check for empty input field
    if (!book || !chapter || !version) {
      setIsSearchInvalid(true);
      return;
    }

    // Check for non existent bible book
    const booksInBible = Object.keys(versesCount);
    let bookFound = false;
    for(let i = 0; i < booksInBible.length; i++){
      if (book === booksInBible[i]){
        bookFound = true;
      }
    }
    if (bookFound === false) {
      setIsSearchInvalid(true);
      return;
    }

    // Check for out of range bible chapter
    if (chapter > versesCount[book].length){
      setIsSearchInvalid(true);
      return;
    }

    // Check for out of range bible verses
    if (verse){
      if (verse > versesCount[book][chapter - 1]){
        setIsSearchInvalid(true);
        return;
      }
    }

    // Since everything above is correct, run code to get bible verses
    setIsSearchInvalid(false);
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

  const checkTypo = () => {
    if (input === input.toLowerCase()) {
      setTypo(true);
    } else {
      setTypo(false);
    }
  };

  useEffect(() => {
    fetchVerses();
  }, [fetchVerses]);

  useEffect(() => {
    onValue(retrieveFavouriteVerses(), (snapshot) => {
      setUpdateFavourites([]);
      if (snapshot) {
        snapshot.forEach((childSnapshot) => {
          setUpdateFavourites((updateFavourites) => [
            ...updateFavourites,
            childSnapshot.val(),
          ]);
        });
      }
    });
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{ minHeight: "100vh", backgroundColor: "rgba(211,211,211,0.2)" }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 3, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => {
            setInput(e.target.value);
            checkTypo();
          }}
          size="small"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          helperText="Search in this format: 1 John.3 (book.chapter), or 1 John.3.1 (book.chapter.verse). Click on any verse while reading to favourite it!"
        />
        {typo && (
          <p
            style={{
              color: "red",
              fontSize: "12px",
              margin: "0",
              paddingLeft: "40px",
              width: "100%",
            }}
          >
            Ensure that you follow the format strictly without typos!
          </p>
        )}
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
          maxHeight: "65vh",
          overflow: "auto",
          p: 4,
        }}
      >
        {isSearchInvalid ? (
          <h3 style={{ textTransform: "capitalize" }}>Search is invalid. Try again.</h3>
        ) : (
          <>
            <h3 style={{ textTransform: "capitalize" }}>
              {book} {chapter}
            </h3>
            <Divider />
            {printText.map((text, index) => (
              <EachVerse
                key={index}
                text={text}
                index={index}
                book={book}
                chapter={chapter}
                verse={verse}
                updateFavourites={updateFavourites}
                setUpdateFavourites={setUpdateFavourites}
              />
            ))}
          </>
        )}
      </Paper>
    </Paper>
  );
}
