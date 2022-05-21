import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Тарас Шевченко', number: '+3333333' },
      { id: 'id-2', name: 'Ліна костенко', number: '+6666666' },
      { id: 'id-3', name: 'Михайло Коцюбинський', number: '+4444444' },
      { id: 'id-4', name: 'Іван Франко', number: '+5555555' },
    ],
    filter: '',
  };

  addContact = ({ contacts, id, name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => {
      if (
        contacts.some(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        return alert(`${contact.name} is already in contacts`);
      }
      return {
        contacts: [...contacts, contact],
      };
    });
  };

  setFilter = name => {
    this.setState({ filter: name });
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
      filter: '',
    }));
  };

  filterContacts = () => {
    const filter = this.state.filter;
    const contacts = this.state.contacts;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} setFilter={this.setFilter} />
        <ContactList
          contacts={this.filterContacts()}
          onDelete={this.removeContact}
        />
      </div>
    );
  }
}
