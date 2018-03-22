import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Cover from './Cover';
import { LINKS_PER_PAGE } from '../constants';

// 1
export const PROJECTS_QUERY = gql`
    query ProjectsQuery($input: ProjectsInput) {
        projects(params: $input) {
            id
            name
            covers
            owners {
                display_name
            }
        }
    }
`;

class LinkList extends Component {
    // componentDidMount() {
    //     this._subscribeToNewLinks();
    //     this._subscribeToNewVotes();
    // }
    render() {
        const { projects, loading, error } = this.props.projectsQuery;

        if (loading) return <div>Loading</div>;
        if (error) return <pre>{error.message}</pre>;

        // const isNewPage = this.props.location.pathname.includes('new');
        // const linksToRender = this._getLinksToRender(isNewPage);
        // const page = parseInt(this.props.match.params.page, 10);

        return (
            <div>
                <div className="cf pa2">
                    {projects.map(project => (
                        <div
                            className="fl w-50 w-25-m w-20-l pa2"
                            key={project.id}
                        >
                            <Cover {...project} />
                        </div>
                    ))}
                </div>
                {/* {isNewPage && (
                    <div className="flex ml4 mv3 gray">
                        <div
                            className="pointer mr2"
                            onClick={() => this._previousPage()}
                        >
                            Previous
                        </div>
                        <div
                            className="pointer"
                            onClick={() => this._nextPage()}
                        >
                            Next
                        </div>
                    </div>
                )} */}
            </div>
        );
    }

    // _getLinksToRender = isNewPage => {
    //     if (isNewPage) {
    //         return this.props.projectsQuery.feed.links;
    //     }
    //     const rankedLinks = this.props.projectsQuery.feed.links.slice();
    //     rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    //     return rankedLinks;
    // };

    // _updateCacheAfterVote = (store, createVote, linkId) => {
    //     const isNewPage = this.props.location.pathname.includes('new');
    //     const page = parseInt(this.props.match.params.page, 10);
    //     const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    //     const first = isNewPage ? LINKS_PER_PAGE : 100;
    //     const orderBy = isNewPage ? 'createdAt_DESC' : null;
    //     const data = store.readQuery({
    //         query: PROJECTS_QUERY,
    //         variables: { first, skip, orderBy }
    //     });

    //     const votedLink = data.feed.links.find(link => link.id === linkId);
    //     votedLink.votes = createVote.link.votes;
    //     store.writeQuery({ query: PROJECTS_QUERY, data });
    // };

    // _subscribeToNewLinks = () => {
    //     this.props.projectsQuery.subscribeToMore({
    //         document: gql`
    //             subscription {
    //                 newLink {
    //                     node {
    //                         id
    //                         url
    //                         description
    //                         createdAt
    //                         postedBy {
    //                             id
    //                             name
    //                         }
    //                         votes {
    //                             id
    //                             user {
    //                                 id
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         `,
    //         updateQuery: (previous, { subscriptionData }) => {
    //             const newAllLinks = [
    //                 subscriptionData.data.newLink.node,
    //                 ...previous.feed.links
    //             ];
    //             const result = {
    //                 ...previous,
    //                 feed: {
    //                     links: newAllLinks
    //                 }
    //             };
    //             return result;
    //         }
    //     });
    // };

    // _subscribeToNewVotes = () => {
    //     this.props.projectsQuery.subscribeToMore({
    //         document: gql`
    //             subscription {
    //                 newVote {
    //                     node {
    //                         id
    //                         link {
    //                             id
    //                             url
    //                             description
    //                             createdAt
    //                             postedBy {
    //                                 id
    //                                 name
    //                             }
    //                             votes {
    //                                 id
    //                                 user {
    //                                     id
    //                                 }
    //                             }
    //                         }
    //                         user {
    //                             id
    //                         }
    //                     }
    //                 }
    //             }
    //         `,
    //         updateQuery: (previous, { subscriptionData }) => {
    //             console.log(`NEW VOTE`);
    //             // const votedLinkIndex = previous.feed.links.findIndex(
    //             //     link =>
    //             //         link.id === subscriptionData.data.newVote.node.link.id
    //             // );
    //             const newAllLinks = previous.feed.links.slice();
    //             const result = {
    //                 ...previous,
    //                 allLinks: newAllLinks
    //             };
    //             return result;
    //         }
    //     });
    // };

    // _nextPage = () => {
    //     const page = parseInt(this.props.match.params.page, 10);
    //     if (page <= this.props.projectsQuery.feed.count / LINKS_PER_PAGE) {
    //         const nextPage = page + 1;
    //         this.props.history.push(`/new/${nextPage}`);
    //     }
    // };

    // _previousPage = () => {
    //     const page = parseInt(this.props.match.params.page, 10);
    //     if (page > 1) {
    //         const previousPage = page - 1;
    //         this.props.history.push(`/new/${previousPage}`);
    //     }
    // };
}

export default graphql(PROJECTS_QUERY, {
    name: 'projectsQuery'
    // options: ownProps => {
    //     const page = parseInt(ownProps.match.params.page, 10);
    //     const isNewPage = ownProps.location.pathname.includes('new');
    //     const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    //     const first = isNewPage ? LINKS_PER_PAGE : 100;
    //     const orderBy = isNewPage ? 'createdAt_DESC' : null;
    //     return {
    //         variables: { first, skip, orderBy }
    //     };
    // }
})(LinkList);
