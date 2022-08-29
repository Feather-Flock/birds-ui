import React from "react";
import { Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import UserProfile from "../UserProfile/UserProfile";
import './App.css';

const client = new ApolloClient({
  uri: "endpoint goes here",
  cache: new InMemoryCache()
});

const App = () =>  {
  return (
    <ApolloProvider client={client}>
      {/* <div className="App">
        <h1 className="App-header"> Hello world!</h1>
      </div> */}
      <UserProfile />
    </ApolloProvider>
  );
}

export default App;
