import { Route, Switch } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import GoalEditorContainer from "../NewGoalFlow/GoalEditorContainer";

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path="/home">
        <Homepage user={user} />
      </Route>
      <Route exact path="/new">
        <GoalEditorContainer user={user} />
      </Route>
    </Switch>
  );
}
