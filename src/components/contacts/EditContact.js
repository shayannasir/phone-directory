import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditContact extends Component {
  constructor(props) {
    super();
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { contact, firestore, history } = this.props;
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value
    };

    firestore
      .update(
        {
          collection: 'contacts',
          doc: contact.id
        },
        updClient
      )
      .then(history.push('/'));
  };

  render() {
    const { contact } = this.props;
    if (contact) {
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
                    ref={this.firstNameInput}
                    defaultValue={contact.firstName}
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
                    ref={this.lastNameInput}
                    defaultValue={contact.lastName}
                  />
                </div>
                <div className="form-groups">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    defaultValue={contact.email}
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
                    ref={this.phoneInput}
                    defaultValue={contact.phone}
                  />
                </div>
                <br />
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
    } else {
      return <Spinner />;
    }
  }
}

EditContact.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'contacts',
      storeAs: 'contact',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    contact: ordered.contact && ordered.contact[0]
  }))
)(EditContact);
