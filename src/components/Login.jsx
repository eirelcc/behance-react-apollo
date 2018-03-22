import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

class Login extends Component {
    state = {
        login: true, // switch between Login and SignUp
        password: '',
        username: ''
    };

    render() {
        const { login } = this.state;
        return (
            <div>
                <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
                <div className="flex flex-column">
                    <input
                        value={this.state.username}
                        onChange={e =>
                            this.setState({ username: e.target.value })
                        }
                        type="text"
                        placeholder={
                            login ? 'Username' : 'Your Behance username'
                        }
                    />
                    <input
                        value={this.state.password}
                        onChange={e =>
                            this.setState({ password: e.target.value })
                        }
                        type="password"
                        placeholder={
                            login ? 'Password' : 'Choose a safe password'
                        }
                    />
                </div>
                <div className="flex mt3">
                    <div
                        className="pointer mr2 button"
                        onClick={() => this._confirm()}
                    >
                        {this.state.login ? 'login' : 'create account'}
                    </div>
                    <div
                        className="pointer button"
                        onClick={() =>
                            this.setState({ login: !this.state.login })
                        }
                    >
                        {this.state.login
                            ? 'need to create an account?'
                            : 'already have an account?'}
                    </div>
                </div>
            </div>
        );
    }

    _confirm = async () => {
        const { username, password } = this.state;
        if (this.state.login) {
            const result = await this.props.loginMutation({
                variables: {
                    username,
                    password
                }
            });
            const { token } = result.data.login;
            this._saveUserData(token);
        } else {
            const result = await this.props.signupMutation({
                variables: {
                    username,
                    password
                }
            });
            const { token } = result.data.signup;
            this._saveUserData(token);
        }
        this.props.history.push(`/`);
    };

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    };
}

export default compose(
    graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
    graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(Login);
