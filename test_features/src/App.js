import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Landing from './Landing'
function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home key={'hello'} /* hello={'app'}*/ />
          </Route>
          <Route exact path='/home'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
