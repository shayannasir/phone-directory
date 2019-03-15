import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Dashboard from './components/layout/Dashboard';
import AppNavbar from './components/layout/AppNavbar';
import AddContact from './components/contacts/AddContact';
import ContactDetails from './components/contacts/ContactDetails';
import EditContact from './components/contacts/EditContact';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/:id" component={ContactDetails} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
