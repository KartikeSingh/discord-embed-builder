import React from 'react';
import { Home } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/menu" exact={true} component={Home} />
        <Route path="/guild/:id" exact={true} component={Home} />
      </Switch>
    </div>
  );
}

export default App;
