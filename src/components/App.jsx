import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: '4564', name: 'Vasya Pupkin', numberTel: '098564372' },
        { id: 'id-1', name: 'Rosie Simpson', numberTel: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', numberTel: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', numberTel: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', numberTel: '227-91-26' },
      ]
    );
  });

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} is already in contacts`);
    }

    setContacts(prevContacts => [...contacts, contact]);
  };

  // const changeFilter = e => {
  //   setFilter(e.currentTarget.value);
  // };

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setFilter('');
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList contacts={filterContacts()} onDelete={removeContact} />
    </div>
  );
}
