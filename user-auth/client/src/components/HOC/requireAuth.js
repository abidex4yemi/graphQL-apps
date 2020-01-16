import React, { useEffect } from "react";
import { graphql } from "react-apollo";
import currentUserQuery from "../../queries/currentUserQuery";

export default Component => {
  const RequireAuth = props => {
    useEffect(() => {
      if (!props.data.loading && !props.data.user) {
        props.history.push("/login");
      }
    }, [props]);

    return <Component {...props} />;
  };

  return graphql(currentUserQuery)(RequireAuth);
};
