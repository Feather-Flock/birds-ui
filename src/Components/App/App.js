import React from "react";
import { NavLink, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import Dashboard from "../Dashboard/Dashboard";

import './App.css';


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BASE_URL}/graphql?test=1`,
  cache: new InMemoryCache()
});

const App = () =>  {

  return (
    <ApolloProvider client={client}>     
      <Route exact path="/">
        <Dashboard />
      </Route>

    </ApolloProvider>
  );
}

export default App;
