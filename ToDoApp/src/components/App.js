import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "../styles/App.css";
import Create from "./create";
import Work from "./work";
import Listmenu from "./listmenu";
import Edittask from "./edittask";
import Profilecomp from "./profilecomp";
import About from "./about";
import Error from "./error";

function App() {
  console.log = console.warn = console.error = () => {};
  console.error("Some Error Occured.");

  return (
    <div className="App">
      <div className="main">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <div>
                  <Work props={props} />
                </div>
              )}
            />
            <Route exact path="/create">
              <Create type="newtask" />
            </Route>
            <Route exact path="/listmenu">
              <Listmenu />
            </Route>
            <Route exact path="/taskedit/:id" component={Edittask} />
            <Route exact path="/profile" component={Profilecomp} />
            <Route exact path="/aboutus" component={About} />
            <Route
              exact
              path="/:listtype"
              render={(props) => (
                <div>
                  <Work props={props} />
                </div>
              )}
            />
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
