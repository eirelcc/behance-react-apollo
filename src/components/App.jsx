import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import Login from './Login';
import Projects from './Projects';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Projects} />
                {/* <Route exact path="/login" component={Login} /> */}
            </Switch>
        );
    }
}

export default App;
