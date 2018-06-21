import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

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
    return (
      <div>
        <ListContacts contacts={this.state.contacts} onDelete={this.removeContact}/>
      </div>
    );
  }
}

export default App;
