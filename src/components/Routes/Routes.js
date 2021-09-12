import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import GoalWeekEntry from "../GoalWeekEntry/GoalWeekEntry";
import Homepage from "../Homepage/Homepage";
import GoalEditorContainer from "../NewGoalFlow/GoalEditorContainer";

export default function Routes() {
  const [{ user }] = useContext(AuthContext);
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
