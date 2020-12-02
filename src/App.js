import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Messenger from "./messanger/Messenger";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/message">
            <Header user={user} setUsername={setUsername} username={username} />
            <Messenger username={username} />
          </Route>
          <Route path="">
            <Header user={user} setUsername={setUsername} username={username} />
            <Home user={user} setUsername={setUsername} username={username} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
