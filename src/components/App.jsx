import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = newContact => {
    const isExist = this.handleCheckUnique(newContact.name);

    if (isExist) return false;

    this.setState(
      ({ contacts }) => ({
        contacts: [...contacts, { id: nanoid(), ...newContact }],
      }),
      this.saveDataToLocalStorage
    );

    return true;
  };

  handleCheckUnique = name => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.some(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return isExistContact;
  };

  handleRemoveContact = id =>
    this.setState(
      ({ contacts }) => ({
        contacts: contacts.filter(contact => contact.id !== id),
      }),
      this.saveDataToLocalStorage
    );

  handleFilterChange = event => {
    const filter = event.target.value;
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  saveDataToLocalStorage = () => {
    const stringifiedContacts = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  };

  loadDataFromLocalStorage = () => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({ contacts });
  };

  componentDidMount() {
    window.addEventListener('load', this.loadDataFromLocalStorage);
    this.loadDataFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      this.saveDataToLocalStorage();
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div
          style={{
            width: '80%',
            margin: 40,
          }}
        >
          <h1
            style={{
              fontSize: 50,
              color: 'rgb(54, 54, 54)',
              textAlign: 'center',
            }}
          >
            Phonebook
          </h1>
          <ContactForm onAdd={this.handleAddContact} />

          <h2
            style={{
              fontSize: 40,
              color: 'rgb(54, 54, 54)',
              textAlign: 'center',
            }}
          >
            Contacts
          </h2>
          <h3
            style={{
              fontSize: 35,
              color: 'rgb(54, 54, 54)',
              margin: 0,
            }}
          >
            Find contacts by name
          </h3>
          <Filter filter={filter} onChange={this.handleFilterChange} />

          <ContactList
            contacts={visibleContacts}
            onRemove={this.handleRemoveContact}
          />
        </div>
      </div>
    );
  }
}
