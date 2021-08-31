import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import theme from "../../util/Theme/Theme";
import Routes from "../Routes/Routes";
import { auth } from "../../firebase/firebaseConfig";
import { GoalsContextProvider } from "../../context/GoalsContext";

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
        <GoalsContextProvider>
          <NavBar user={user} />
          <Routes user={user} />
        </GoalsContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
