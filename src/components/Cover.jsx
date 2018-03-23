import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

// const VOTE_MUTATION = gql`
//     mutation VoteMutation($linkId: ID!) {
//         vote(linkId: $linkId) {
//             id
//             link {
//                 votes {
//                     id
//                     user {
//                         id
//                     }
//                 }
//             }
//             user {
//                 id
//             }
//         }
//     }
// `;

// class Link extends Component {
//     render() {
//         const authToken = localStorage.getItem(AUTH_TOKEN);
//         return (
//             <div className="flex mt2 items-start">
//                 <div className="flex items-center">
//                     <span className="gray">{this.props.index + 1}.</span>
//                     {authToken && (
//                         <div
//                             className="ml1 gray f11"
//                             onClick={() => this._voteForLink()}
//                         >
//                             ▲
//                         </div>
//                     )}
//                 </div>
//                 <div className="ml1">
//                     <div>
//                         {this.props.link.description} ({this.props.link.url})
//                     </div>
//                     <div className="f6 lh-copy gray">
//                         {this.props.link.votes.length} votes | by{' '}
//                         {this.props.link.postedBy
//                             ? this.props.link.postedBy.name
//                             : 'Unknown'}{' '}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     _voteForLink = async () => {
//         const linkId = this.props.link.id;
//         await this.props.voteMutation({
//             variables: {
//                 linkId
//             },
//             update: (store, { data: { vote } }) => {
//                 this.props.updateStoreAfterVote(store, vote, linkId);
//             }
//         });
//     };
// }

// export default graphql(VOTE_MUTATION, {
//     name: 'voteMutation'
// })(Link);

const Cover = ({ name, author, src }) => {
    return (
        <div>
            <div>{name}</div>
            <div>By {author}</div>
            <img src={src} alt={name} width="200" height="150" />
        </div>
    );
};

export default Cover;
