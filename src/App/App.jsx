import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';

const loadDataFromLocalStorage = () => {
  try {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) || [];
    return parsedContacts;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return [];
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(loadDataFromLocalStorage);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [contacts]);

  const handleAddContact = newContact => {
    const isExist = handleCheckUnique(newContact.name);

    if (isExist) return false;

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);

    return true;
  };

  const handleCheckUnique = name => {
    const isExistContact = contacts.some(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return isExistContact;
  };

  const handleRemoveContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = event => {
    const filter = event.target.value;
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.title1}>Phonebook</h1>
        <ContactForm onAdd={handleAddContact} />

        <h2 className={css.title2}>Contacts</h2>
        <h3 className={css.title3}>Find contacts by name</h3>
        <Filter filter={filter} onChange={handleFilterChange} />

        <ContactList
          contacts={visibleContacts}
          onRemove={handleRemoveContact}
        />
      </div>
    </div>
  );
};
