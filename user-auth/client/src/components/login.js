import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./AuthForm";
import loginMutation from "../mutations/login";
import currentUserQuery from "../queries/currentUserQuery";

const Login = props => {
  const [errors, setError] = useState([]);

  useEffect(() => {
    if (props.data.user) {
      props.history.push("/dashboard");
    }
  }, [props]);

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
      .catch(res => {
        const errors = res.graphQLErrors.map(
          error => error.message.replace('"', "").split(":")[1]
        );
        setError(errors);
      });
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h4>login</h4>
      <AuthForm handleSubmit={handleSubmit} errors={errors} />
    </div>
  );
};

export default graphql(currentUserQuery)(graphql(loginMutation)(Login));
