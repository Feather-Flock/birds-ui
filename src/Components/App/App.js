import React from "react";
import { Route } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import { GET_USER_BY_ID } from "../../queries";
import DashboardList from "../DashboardList/DashboardList";
import Dashboard from "../Dashboard/Dashboard";
import Nav from "../Nav/Nav"
import './App.css';
import EventForm from '../EventForm/EventForm'
import EventModal from '../EventModal/EventModal'
import UserContext from "../../Context/UserContext"
import { useQuery } from "@apollo/client";



const App = () =>  {

  const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID, {
    variables: {"id": process.env.REACT_APP_USER_ID}
  })

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  return (
    <UserContext.Provider value={data.user}>
      <div className="App">
        <Nav />
        <Route exact path="/">
          <Dashboard refetch={refetch}/>
        </Route>
        <Route exact path="/dashboard-list">
          <DashboardList />
        </Route>
        <Route exact path="/New-Event">
          <EventForm />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
      </div>
    </UserContext.Provider>
  );
}

export default App;
