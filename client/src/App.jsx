import Home from "./views/Home";
import ViewTask from "./views/ViewTask";
import { Route, Switch } from "wouter";

export default function App() {
    return (
        <>
            <Route path="/" component={Home} />
            <Route path="tasks/:taskId" component={ViewTask} />
        </>
    );
}
