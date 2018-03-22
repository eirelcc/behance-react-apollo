import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import Header from './Header';
import Projects from './Projects';

class App extends Component {
    render() {
        return (
            <div className="center w85">
                <Header />
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={Projects} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
