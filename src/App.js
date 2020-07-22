import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from "./components/navbar.component";
import ServicesList from "./components/services-list.component";
import EditService from "./components/edit-service.component";
import CreateAppointment from "./components/create-appointment.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
        <br/>
        <Route path="/" exact component={ServicesList} />
        <Route path="/edit/:id" component={EditService} />
        <Route path="/create" component={CreateAppointment} />
        <Route path="/user" component={CreateUser} />
    </div>
    </Router>
  );
}

export default App;
