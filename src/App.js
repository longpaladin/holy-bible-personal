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

export default function App() {
  const [user, setUser] = useState(null);
  console.log(user)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      setUser(user);
    });
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage user={user} />}>
            <Route path="newuser" element={<NewUserForm user={user} />} />
            <Route path="login" element={<LoginForm user={user} />} />
          </Route>
          <Route>
            <Route element={<HomePage user={user} />}>
              <Route
                path="readthebible"
                element={<DisplayVerses user={user} />}
              />
              <Route path="studybybooks" element={<BibleBooks user={user} />} />
            </Route>
          </Route>
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
