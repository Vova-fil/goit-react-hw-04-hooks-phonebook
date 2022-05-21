import PropTypes from 'prop-types';
import s from './Contact.module.css';

export function Contact({ number, name, id, onDelete }) {
  return (
    <li className={s.contactItem}>
      <span>
        {name}: {number}
      </span>
      <button className={s.button} type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
