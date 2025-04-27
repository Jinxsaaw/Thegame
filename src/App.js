import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Home";
import Game from "./Game";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home name={name} updateName={setName} />
          </Route>
          <Route exact path="/game">
            <Game name={name} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
