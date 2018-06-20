import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  handleChange = (newQuery) => {
    this.setState((prevState) => ({
      query: newQuery.trim()
    }))
  }
  render() {
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={this.state.query}
            onChange={(event) => this.handleChange(event.target.value)}
          />
        </div>
        <ol className='contact'>
          {this.props.contacts.map((contact)=> (
            <li key={contact.id} className='contact-list-item'>
              <div 
                className="contact-avatar" 
                style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button className='contact-remove' onClick={() => this.props.onDelete(contact)}>Remove</button>
            </li>
          ))}
        </ol>
      </div>
      );
  }
}
export default ListContacts;