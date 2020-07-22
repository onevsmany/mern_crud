import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Service = props => (
  <tr>
    <td>{props.service.username}</td>
    <td>{props.service.firstname}</td>
    <td>{props.service.lastname}</td>
    <td>{props.service.phonenumber}</td>
    <td>{props.service.email}</td>
    <td>{props.service.description}</td>
    <td>{props.service.duration}</td>
    <td>{props.service.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.service._id}>edit</Link> | <a href="#" onClick={() => { props.deleteService(props.service._id) }}>delete</a>
    </td>
  </tr>
)

export default class ServicesList extends Component {
  constructor(props) {
    super(props)

    this.deleteService = this.deleteService.bind(this);

    this.state = {services: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/services/')
      .then(response => {
        this.setState({ services: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteService(id) {
  axios.delete('http://localhost:5000/services/'+id)
    .then(response => { console.log(response.data)});

  this.setState({
    services: this.state.services.filter(el => el._id !== id)
  })
}

serviceList() {
  return this.state.services.map(currentservice => {
    return <Service service={currentservice} deleteService={this.deleteService} key={currentservice._id}/>;
  })
}


  render() {
      return (
        <div>
        <h3>Logged Services</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>


            </tr>
          </thead>
          <tbody>
            { this.serviceList() }
          </tbody>
        </table>
      </div>
      )
    }
}
