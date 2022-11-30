import { useEffect, useState } from "react";
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
var bible = require("holy-bible");

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
  const [verse, setVerse] = useState("");
  const [input, setInput] = useState("Genesis.1");
  const [printText, setPrintText] = useState([]);
  const [versesInChapter, setVersesInChapter] = useState(31);
  const [inputParts, setInputParts] = useState(2);

  async function getVersesCount() {
    await bible.get(input).then((res) => {
      setBook(input.slice(0, input.indexOf(".")));
      setChapter(parseInt(input.slice(input.indexOf(".") + 1)));
    }).catch((err)=>{
      console.log(err)
    });
  }

  useEffect(() => {
    if (book && chapter) {
      const bibleBook = versesCount[book];
      setVersesInChapter(bibleBook[chapter - 1]);
    }
  }, [book, chapter]);

  async function getBibleVerses() {
    for (let i = 1; i <= versesInChapter; i++) {
      await bible.get(`${input}.${i}`, version).then((res) => {
        setPrintText((printText) => [...printText, `${i} ${res.text}`]);
      });
    }
  }

  async function getOneBibleVerse() {
    setBook(input.slice(0, input.indexOf(".")));
    let tempValue = input.slice(input.indexOf(".") + 1);
    setChapter(parseInt(tempValue.slice(0, tempValue.indexOf("."))));
    setVerse(parseInt(tempValue.slice(tempValue.indexOf(".") + 1)));

    await bible.get(input, version).then((res) => {
      setPrintText([`${res.text}`]);
    });
  }

  // Runs whenever version of bible changes
  useEffect(() => {
    setPrintText([]);
    if (inputParts === 2) {
      getVersesCount();
      getBibleVerses();
    } else {
      getOneBibleVerse();
    }
  }, [version]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrintText([]);

    setInputParts(input.split(".").length);
    if (inputParts === 2) {
      getVersesCount();
      getBibleVerses();
    } else {
      getOneBibleVerse();
    }
  };

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
        {inputParts === 2 ? (
          printText.map((text, index) => (
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
                <b>{text.slice(0, text.indexOf(" "))}</b>
              </sup>
              {text.slice(text.indexOf(" "))}
            </p>
          ))
        ) : (
          <p
            style={{
              textAlign: "left",
              margin: "0px",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "12px",
            }}
          >
            <sup>
              <b>{verse} </b>
            </sup>
            {printText[0]}
          </p>
        )}
      </Paper>
    </Paper>
  );
}
