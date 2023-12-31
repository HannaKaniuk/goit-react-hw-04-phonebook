import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleAddContact = newContact => {
    const isExist = handleCheckUnique(newContact.name);

    if (isExist) return false;

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...newContact },
    ]);

    saveDataToLocalStorage();

    return true;
  };

  const handleCheckUnique = name => {
    const isExistContact = !!contacts.some(contact => contact.name === name);
    isExistContact && alert('Contact is already exist');
    return isExistContact;
  };

  const handleRemoveContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    saveDataToLocalStorage();
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

  const saveDataToLocalStorage = () => {
    setContacts(prevContacts => {
      const stringifiedContacts = JSON.stringify(prevContacts);
      localStorage.setItem('contacts', stringifiedContacts);
      return prevContacts;
    });
  };

  const loadDataFromLocalStorage = () => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) || [];
    setContacts(parsedContacts);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const visibleContacts = getVisibleContacts();
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
        <ContactForm onAdd={handleAddContact} />

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
        <Filter filter={filter} onChange={handleFilterChange} />

        <ContactList
          contacts={visibleContacts}
          onRemove={handleRemoveContact}
        />
      </div>
    </div>
  );
};
