import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import theme from "../../util/Theme/Theme";
import Routes from "../Routes/Routes";
import { auth } from "../../firebase/firebaseConfig";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar user={user} />
        <Routes user={user} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
