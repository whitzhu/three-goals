import { Route, Switch } from "react-router-dom";
import GoalWeekEntry from "../GoalWeekEntry/GoalWeekEntry";
import Homepage from "../Homepage/Homepage";
import GoalEditorContainer from "../NewGoalFlow/GoalEditorContainer";

export default function Routes({ user }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage user={user} />
      </Route>
      <Route exact path="/new">
        <GoalEditorContainer user={user} />
      </Route>
      <Route path="/week/:goalId">
        <GoalWeekEntry />
      </Route>
    </Switch>
  );
}
