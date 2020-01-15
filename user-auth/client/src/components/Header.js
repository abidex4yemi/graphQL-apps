import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import currentUserQuery from "../queries/currentUserQuery";
import logoutMutation from "../mutations/logout";

const Header = props => {
  const { loading, user } = props.data;

  const handleLogout = () => {
    props.mutate({
      refetchQueries: [
        {
          query: currentUserQuery
        }
      ]
    });
  };

  const renderAuthButton = () => {
    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a
            href="#!"
            onClick={handleLogout}
            className="waves-effect waves-light btn"
          >
            logout
          </a>
        </li>
      );
    }

    return (
      <>
        <li>
          <Link to="/register">register</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            logo
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderAuthButton()}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default graphql(logoutMutation)(graphql(currentUserQuery)(Header));
