import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class ContactDetails extends Component {
  onDeleteClick = () => {
    const { contact, firestore, history } = this.props;
    firestore.delete({ collection: 'contacts', doc: contact.id }).then(() => {
      history.push('/');
    });
  };

  render() {
    const { contact } = this.props;
    if (contact) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link
                  to={`/contact/edit/${contact.id}`}
                  className="btn btn-dark"
                >
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {contact.firstName} {contact.lastName}
            </h3>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {contact.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {contact.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <h4 style={{ color: 'grey' }}>
          Sending minions to fetch the information...
        </h4>
      );
    }
  }
}
ContactDetails.propTypes = {
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
)(ContactDetails);
