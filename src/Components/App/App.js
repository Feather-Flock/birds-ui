import React from "react";
import { NavLink, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import UserProfile from "../UserProfile/UserProfile";
import { GET_USER_BY_ID } from "../../queries";
import DashboardList from "../DashboardList/DashboardList";
import Dashboard from "../Dashboard/Dashboard";
import Nav from "../Nav/Nav"
import './App.css';
import EventForm from '../EventForm/EventForm'


const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BASE_URL}/graphql?test=1`,
  cache: new InMemoryCache()
});

const App = () =>  {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Route exact path="/">
          <Nav />
          <Dashboard />
        </Route>
        <Route exact path="/dashboard-list">
          <Nav />
          <DashboardList />
        </Route>
        <Route exact path="/New-Event">
          <EventForm />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
      </div>
    </ApolloProvider>
  );
}

export default App;
