import React from "react";
import { NavLink, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GET_USER_BY_ID } from "../../queries";
import './App.css';
import Dashboard from "../Dashboard/Dashboard";
import EventForm from '../EventForm/EventForm'
import UserProfile from "../UserProfile/UserProfile";


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BASE_URL}/graphql?test=1`,
  cache: new InMemoryCache()
});

const App = () =>  {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <Route exact path="/">
          <Dashboard />
        </Route> */}
        <Route exact path="/New-Event">
          <EventForm />
        </Route>
        <Route exact path="/User-Profile">
          <UserProfile />
        </Route>
      </div>
      <UserProfile />
    </ApolloProvider>
  );
}

export default App;
