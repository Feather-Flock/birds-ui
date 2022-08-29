import React from "react";
import { NavLink, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import './App.css';


const client = new ApolloClient({
  uri: `${REACT_APP_BASE_URL}/graphql`,
  cache: new InMemoryCache()
});

const App = () =>  {

  return (
    <ApolloProvider client={client}>     
      <Route>
        <Dashboard />
      </Route>

    </ApolloProvider>
  );
}

export default App;
