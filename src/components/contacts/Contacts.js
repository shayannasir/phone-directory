import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Sidebar from '../layout/Sidebar';
import Spinner from '../layout/Spinner';

class Contacts extends Component {
  render() {
    const { contacts } = this.props;

    if (contacts) {
      return (
        <div>
          <div className="row">
            <div className="col-md-10">
              <h2>
                {' '}
                <i className="fas fa-users" /> Contacts{' '}
              </h2>
            </div>
            <div className="col-md-2">
              <Sidebar />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td>{contact.phone}</td>
                  <td>
                    <Link
                      to={`/contact/${contact.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Contacts.propTypes = {
  firestore: PropTypes.object.isRequired,
  contacts: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'contacts' }]),
  connect((state, props) => ({
    contacts: state.firestore.ordered.contacts
  }))
)(Contacts);
