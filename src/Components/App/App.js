import React from "react";
import { Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import './App.css';
import EventForm from '../EventForm/EventForm'

const client = new ApolloClient({
  uri: "endpoint goes here",
  cache: new InMemoryCache()
});

const App = () =>  {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <EventForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
