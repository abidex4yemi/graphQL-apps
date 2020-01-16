import React, { useState } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import signMutation from "../mutations/signup";
import currentUserQuery from "../queries/currentUserQuery";

const SignUp = props => {
  const [errors, setError] = useState([]);

  const handleSubmit = ({ email, password }) => {
    props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [
          {
            query: currentUserQuery
          }
        ]
      })
      .then(res => {
        props.history.push("/dashboard");
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        setError(errors);
      });
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h4>sign up</h4>
      <AuthForm handleSubmit={handleSubmit} errors={errors} />
    </div>
  );
};

export default graphql(signMutation)(SignUp);
