import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { AUTH_TOKEN } from '../constants';

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <div className="flex pa1 justify-between nowrap orange">
                <div className="flex flex-fixed black">
                    <div className="fw7 mr1">Behance Apollo</div>
                    <Link to="/" className="ml1 no-underline black">
                        discover
                    </Link>
                    <div className="ml1">|</div>
                    <Link
                        to="/creatives-to-follow"
                        className="ml1 no-underline black"
                    >
                        creative minds
                    </Link>
                    <div className="ml1">|</div>
                    <Link
                        to="/creative-fields"
                        className="ml1 no-underline black"
                    >
                        creative fields
                    </Link>
                    <div className="ml1">|</div>
                    <Link to="/search" className="ml1 no-underline black">
                        search
                    </Link>
                </div>
                <div className="flex flex-fixed">
                    {authToken && (
                        <div className="flex">
                            <Link
                                to="/profile"
                                className="ml1 no-underline black"
                            >
                                profile
                            </Link>
                            <div className="ml1">|</div>
                        </div>
                    )}
                    {authToken ? (
                        <div
                            className="ml1 pointer black"
                            onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN);
                                this.props.history.push(`/`);
                            }}
                        >
                            logout
                        </div>
                    ) : (
                        <Link to="/login" className="ml1 no-underline black">
                            login
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
