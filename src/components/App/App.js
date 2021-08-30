import NavBar from "../Navbar/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../util/Theme/Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
    </ThemeProvider>
  );
}

export default App;
