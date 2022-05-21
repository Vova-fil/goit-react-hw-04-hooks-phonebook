import PropTypes from 'prop-types';
import { Contact } from '../Contact/Contact';
import s from './ContactList.module.css';

export function ContactList({ contacts, onDelete }) {
  return (
    <ul className={s.itemList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            number={number}
            name={name}
            onDelete={() => onDelete(id)}
          />
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
