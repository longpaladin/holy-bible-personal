import { Divider, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { versesCount } from "../bible_versions/verses";

//Author of npm library: bricejlin (holy bible text) KJV and ASV only
var bible = require("holy-bible");

export function PsalmOfTheDay() {
  const [book, setBook] = useState("Psalms");
  const [chapter, setChapter] = useState(Math.floor(Math.random() * 149) + 1);
  const [versesInChapter, setVersesInChapter] = useState(0);
  const [printText, setPrintText] = useState([]);

  async function getVersesCount() {
    let randomChosenPsalm = `Psalms.${chapter}`;
    await bible
      .get(randomChosenPsalm, "KJV")
      .then((res) => {
        setBook(randomChosenPsalm.slice(0, randomChosenPsalm.indexOf(".")));
        setChapter(
          parseInt(randomChosenPsalm.slice(randomChosenPsalm.indexOf(".") + 1))
        );
        const bibleBook = versesCount[book];
        setVersesInChapter(parseInt(bibleBook[chapter - 1]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getBibleVerses() {
    for (let i = 1; i <= versesInChapter; i++) {
      await bible
        .get(`Psalms.${chapter}.${i}`, "KJV")
        .then((res) => {
          setPrintText((printText) => [...printText, `${i} ${res.text}`]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
      getVersesCount();
      getBibleVerses();
  }, [book, chapter, versesInChapter]);

  return (
    <Paper
      elevation={0}
      sx={{ minHeight: "100vh", backgroundColor: "rgba(211,211,211,0.2)" }}
    >
      <Paper
        elevation={6}
        sx={{
          m: 5,
          maxHeight: "90vh",
          overflow: "auto",
          p: 4,
        }}
      >
        <h1>Psalm of the day - Psalms {chapter} (KJV)</h1>
        <br></br>
        <Divider />
        <br></br>
        {printText.map((text, index) => (
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
        ))}
      </Paper>
    </Paper>
  );
}
