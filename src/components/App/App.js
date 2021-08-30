import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import theme from "../../util/Theme/Theme";
import Routes from "../Routes/Routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
