import { Route, Switch } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
    </Switch>
  );
}
