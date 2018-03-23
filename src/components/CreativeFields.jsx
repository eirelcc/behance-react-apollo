import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Preview from './Preview';

export const CREATIVE_FIELDS_QUERY = gql`
    query CreativeFieldsQuery {
        creativeFields {
            id
            name
        }
    }
`;

class CreativeFields extends React.Component {
    render() {
        const {
            creativeFields,
            loading,
            error
        } = this.props.creativeFieldsQuery;

        if (loading) return <div>Loading</div>;
        if (error) return <pre>{error.message}</pre>;

        return (
            <div>
                <div className="cf pa2">
                    <ul className="list pa3 pa5-ns">
                        {creativeFields.map(({ id, name }) => (
                            <li className="dib mr2" key={id}>
                                <a
                                    href="#"
                                    className="f4 f2-ns b db pa2 link dim mid-gray"
                                >
                                    <span className="fw7 underline-hover">
                                        #{name}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default graphql(CREATIVE_FIELDS_QUERY, {
    name: 'creativeFieldsQuery'
})(CreativeFields);
