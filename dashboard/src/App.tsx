import React from 'react';
import { GuildPage, Home, Menu, } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/menu" exact={true} component={Menu} />
        <Route path="/guild/:guild" exact={true} component={GuildPage} />
      </Switch>
    </div>
  );
}

export default App;
