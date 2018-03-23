import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import Header from './Header';
import Projects from './Projects';
import CreativeFields from './CreativeFields';
import CreativesToFollow from './CreativesToFollow';

class App extends Component {
    render() {
        return (
            <div className="center w85">
                <Header />
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={Projects} />
                        <Route exact path="/login" component={Login} />
                        <Route
                            exact
                            path="/creatives-to-follow"
                            component={CreativesToFollow}
                        />
                        <Route
                            exact
                            path="/creative-fields"
                            component={CreativeFields}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
