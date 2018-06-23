import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: []
  }

  createContact = (body) => {
    ContactsAPI.create(body)
      .then(ContactsAPI.getAll()
        .then((data) => 
          this.setState(() => ({ contacts: [...data]}))
        )
      );
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
    const RouteWrapper = (props) => (
      <Route path={props.path} render={() => props.children}/>
    )

    return (
      <div>
        <Switch>
          <Route path='/create' render={({history}) =>
            <CreateContact onCreateContact={(contact) => 
              {
                this.createContact(contact);
                history.push('/');
              }
            }/>
          }/>
          <RouteWrapper path='/'>
            <ListContacts contacts={this.state.contacts} onDelete={this.removeContact} />          
          </RouteWrapper>
        </Switch>
      </div>
    );
  }
}

export default App;
