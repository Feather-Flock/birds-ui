import React, { useState } from "react";
import { Route } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
import { GET_USER_BY_ID } from "../../queries";
import DashboardList from "../DashboardList/DashboardList";
import Dashboard from "../Dashboard/Dashboard";
import Nav from "../Nav/Nav"
import './App.css';
import EventForm from '../EventForm/EventForm'
import UserContext from "../../Context/UserContext"
import { useQuery } from "@apollo/client";
import Footer from "../Footer/Footer"



const App = () =>  {
  const [range, setRange] = useState({label: "10 Miles", value: 10})
  const handleSelect = (rangeObj) => {
    setRange(rangeObj)
    refetch({variables: {"id": process.env.REACT_APP_USER_ID, "range": parseInt(rangeObj.value)}})
  }
  const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID, {
    variables: {"id": process.env.REACT_APP_USER_ID, "range": parseInt(range.value)}
  })

  console.log(data)

  if(loading) return "Loading..."
  if(error) return `Error! ${error.message}`

  return (
    <UserContext.Provider value={data.user}>
      <div className="App">
        <Nav />
        <Route exact path="/">
          <Dashboard refetch={refetch} handleSelect={handleSelect} range={range} />
        </Route>
        <Route exact path="/dashboard-list">
          <DashboardList refetch={refetch} handleSelect={handleSelect} range={range}/>
        </Route>
        <Route exact path="/New-Event">
          <EventForm />
        </Route>
        <Route exact path="/profile">
          <UserProfile refetch={refetch} />
        </Route>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
