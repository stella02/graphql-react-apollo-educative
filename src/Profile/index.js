import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RepositoryList from '../Repository';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;
// const GET_CURRENT_USER = gql`
//   {
//     viewer {
//       login
//       name
//     }
//   }
// `;

const Profile = () => (
  <Query query={ GET_REPOSITORIES_OF_CURRENT_USER }>
    { ( props) =>  {
      console.log(props)
      const { loading, data, error } = props;

      if(loading || !data) return <p> is loading...</p>
    if(error) return <div>{error.toString()}</div>
      const { viewer } = data;
        
      if(!viewer) {
            return <p> No viewer info.</p>;
      }
      console.log(viewer)
      return <RepositoryList repositories={viewer.repositories} />;
      }
    }
  </Query>
)

 

export default Profile;