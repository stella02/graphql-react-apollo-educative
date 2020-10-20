import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const Profile = () => (
  <Query query={ GET_CURRENT_USER }>
    { ( { data, loading}) =>  {
      // console.log(props)
      // const { loading } = props;

      if(loading) return <p> is loading...</p>
        const { viewer } = data;
        
        if(!viewer) {
            return <p> No viewer info.</p>;
        }
        console.log(viewer)
        return (
          <div>
            {viewer.name} {viewer.login}
          </div>
        )
      }
    }
  </Query>
)

 

export default Profile;