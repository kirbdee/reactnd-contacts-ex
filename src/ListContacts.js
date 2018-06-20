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
  updateQuery = (newQuery) => {
    this.setState((prevState) => ({
      query: newQuery.trim()
    }))
  }

  clearQuery = () => this.updateQuery('');

  render() {
    const { query } = this.state
    const { contacts, onDelete } = this.props

    const showingContacts = query === '' ? 
        contacts : contacts.filter(
          (contactEntry) => 
            contactEntry.name.toLowerCase().includes(query.toLowerCase())
    );
    
    const isFiltered = contacts.length !== showingContacts.length

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        {isFiltered ? 
          (<div className="showing-contacts"><span>Now Showing {showingContacts.length} of {contacts.length}<button onClick={this.clearQuery}>Show all</button></span></div>)
          : null
        }
        <ol className='contact'>
          {showingContacts.map((contact)=> (
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
              <button className='contact-remove' onClick={() => onDelete(contact)}>Remove</button>
            </li>
          ))}
        </ol>
      </div>
      );
  }
}
export default ListContacts;