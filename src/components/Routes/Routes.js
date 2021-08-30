import { Route, Switch } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import NewGoal from "../NewGoalFlow/NewGoal";

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/new">
        <NewGoal />
      </Route>
    </Switch>
  );
}
