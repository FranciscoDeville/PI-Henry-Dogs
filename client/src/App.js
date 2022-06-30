import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateDog from './components/CreateDog'
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create_dog" component={CreateDog} />
          <Route exact path="/home/:id" component={Detail} />
        </Switch>
        <h1>Henry Dogs</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
