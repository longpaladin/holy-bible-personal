import "./App.css";

import { useEffect, useState } from "react";
import { DisplayVerses } from "./components/DisplayVerses";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { NewUserForm } from "./components/NewUserForm";
import { AuthPage } from "./components/AuthPage";
import { HomePage } from "./components/HomePage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { BibleBooks } from "./components/BibleBooks";
import { PsalmOfTheDay } from "./components/PsalmOfTheDay";
import { Favourites } from "./components/Favourites";
import BibleBook from "./components/BibleBook";

export default function App() {
  const [displayCards, setDisplayCards] = useState(true);
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [user]);

  return (
    <>
      <BrowserRouter>
        {/* Before login */}
        <Routes>
          <Route path="/" element={<AuthPage user={user} />}>
            <Route path="psalm-of-the-day" element={<PsalmOfTheDay />} />
            <Route path="newuser" element={<NewUserForm user={user} />} />
            <Route path="login" element={<LoginForm user={user} />} />
          </Route>

          {/* After login */}
          <Route element={<HomePage user={user} />}>
            <Route
              path="readthebible"
              element={
                <DisplayVerses user={user} setDisplayCards={setDisplayCards} />
              }
            />
            <Route
              path="studybybooks"
              element={
                <BibleBooks
                  user={user}
                  displayCards={displayCards}
                  setDisplayCards={setDisplayCards}
                />
              }
            >
              <Route
                path=":bookname"
                element={
                  <BibleBook user={user} setDisplayCards={setDisplayCards} />
                }
              />
            </Route>
            <Route
              path="favourites"
              element={<Favourites setDisplayCards={setDisplayCards} />}
            />
          </Route>

          {/* When all paths fail */}
          <Route
            path="*"
            element={
              <>
                <p>There is nothing here!</p>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
