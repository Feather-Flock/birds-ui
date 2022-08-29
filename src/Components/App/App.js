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

  const { loading, error, data } = useQuery(GET_USER_BY_ID)
  return (
    <ApolloProvider client={client}>     
      <div className="dashboard-container">
        <nav>
          <h1 className="welcome-user">{Welcome Amber!}</h1>
          <NavLink className="nav-create-event">Create Event</NavLink>
        </nav>
        <div className="main-container">
          <div className="rsvp-eventcards">
            
          </div>
          <div className="event-list">

          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
