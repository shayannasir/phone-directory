import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';

class AddContact extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fname: '',
    lname: '',
    mail: '',
    number: '',
    title: ''
  };

  onSubmit = e => {
    e.preventDefault();
    const newContact = this.state;
    const { firestore, history } = this.props;
    firestore
      .add({ collection: 'contacts' }, newContact)
      .then(() => history.push('/'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    const Value = e.target.value;
    const Name = e.target.name;
    switch (Name) {
      case 'firstName':
        this.setState({ fname: Value });
        break;
      case 'lastName':
        this.setState({ lname: Value });
        break;
      case 'email':
        this.setState({ mail: Value });
        break;
      case 'phone':
        this.setState({ number: Value });
        break;
      default:
        this.setState({ title: '' });
        break;
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Contact</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-groups">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  id="fname"
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>
              <div className="form-groups">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>
              <div className="form-groups">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-groups">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <br />
              <b>
                <i>First Name:</i>
              </b>{' '}
              <span>{this.state.fname}</span>
              <br />
              <b>
                <i>Last Name:</i>
              </b>{' '}
              <span>{this.state.lname}</span>
              <br />
              <b>
                <i>Email:</i>
              </b>{' '}
              <span>{this.state.mail}</span>
              <br />
              <b>
                <i>Phone:</i>
              </b>{' '}
              <span>{this.state.number}</span>
              <br />
              <i>
                <p>Please check the above entries before clicking submit.</p>
              </i>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddContact);
