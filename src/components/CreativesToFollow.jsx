import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Preview from './Preview';

export const CREATIVES_TO_FOLLOW_QUERY = gql`
    query CreativesToFollowQuery {
        creativesToFollow {
            id
            company
            images
            display_name
            country
            city
            state
            projects {
                stats {
                    appreciations
                }
                covers
            }
        }
    }
`;

class CreativesToFollow extends React.Component {
    render() {
        const {
            creativesToFollow,
            loading,
            error
        } = this.props.creativesToFollowQuery;

        if (loading) return <div>Loading</div>;
        if (error) return <pre>{error.message}</pre>;

        return (
            <div>
                <div className="cf pa2">
                    {creativesToFollow.map(
                        ({
                            id,
                            display_name,
                            images,
                            country,
                            city,
                            state,
                            projects
                        }) => (
                            <Preview
                                key={id}
                                src={images[images.length - 1]}
                                name={display_name}
                                country={country}
                                city={city}
                                state={state}
                                covers={getTopRatedCovers(projects)}
                            />
                        )
                    )}
                </div>
            </div>
        );
    }
}

export function getTopRatedCovers(projects, max = 5) {
    return projects
        .slice()
        .sort((a, b) => a.stats.appreciations < b.stats.appreciations)
        .slice(0, max)
        .map(project => project.covers[project.covers.length - 1]);
}

export default graphql(CREATIVES_TO_FOLLOW_QUERY, {
    name: 'creativesToFollowQuery'
})(CreativesToFollow);
