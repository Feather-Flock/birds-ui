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
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error"


const App = () =>  {
  const [range, setRange] = useState({label: "3 Miles", value: 3})
  const handleSelect = (rangeObj) => {
    setRange(rangeObj)
    refetch({variables: {"id": process.env.REACT_APP_USER_ID, "range": parseInt(rangeObj.value)}})
  }
  const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID, {
    variables: {"id": process.env.REACT_APP_USER_ID, "range": parseInt(range.value)}
  })

  if(loading) return <LoadingPage />
  if(error) return <Error message={error.message} />

  return (
    <UserContext.Provider value={data.user}>
      <div className="App">
        <Nav refetch={refetch} />
        <Route exact path="/">
          <Dashboard refetch={refetch} handleSelect={handleSelect} range={range} />
        </Route>
        <Route exact path="/dashboard-list">
          <DashboardList refetch={refetch} handleSelect={handleSelect} range={range}/>
        </Route>
        <Route exact path="/New-Event">
          <EventForm refetch={refetch} />
        </Route>
        <Route exact path="/profile">
          <UserProfile refetch={refetch} range={range} />
        </Route>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
