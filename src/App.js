import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: []
  }

  removeContact = (contact) => {
    ContactsAPI.remove(contact)
      .then(ContactsAPI.getAll()
        .then((data) => 
          this.setState((prevState) => ({ contacts: [...data]}))
        )
      );
  }
  
  componentDidMount = () => {
    ContactsAPI.getAll()
      .then((data) => 
        this.setState((prevState) => ({ contacts: [...data]}))
      );
  }

  render() {
    const HomeRoute = (props) => (
      <Route path={props.path} render={() => props.children}/>
    )

    return (
      <div>
        <Switch>
          <Route path='/create' component={CreateContact}/>
          <HomeRoute path='/'>
            <ListContacts contacts={this.state.contacts} onDelete={this.removeContact} />          
          </HomeRoute>
        </Switch>
      </div>
    );
  }
}

export default App;
