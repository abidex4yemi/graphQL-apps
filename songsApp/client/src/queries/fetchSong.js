import gql from "graphql-tag";

export default gql`
  query FindSongById($id: ID!) {
    song(id: $id) {
      id
      title
    }
  }
`;
