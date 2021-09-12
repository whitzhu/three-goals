import React, { useEffect, useContext } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import theme from "../../util/Theme/Theme";
import Routes from "../Routes/Routes";
import { auth } from "../../firebase/firebaseConfig";
import { GoalsContextProvider } from "../../context/GoalsContext";
import { AuthContext } from "../../context/AuthContext";

function App() {
  const [_, dispatch] = useContext(AuthContext);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "updateUser",
        payload: user,
      });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GoalsContextProvider>
          <NavBar />
          <Routes />
        </GoalsContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
