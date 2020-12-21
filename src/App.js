import "./style/App.css";
import CityWeatherContainer from "./components/CityWeatherContainer";
import Chart from "./components/Chart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Weather</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={CityWeatherContainer} />
          <Route path="/:id" exact component={Chart} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
