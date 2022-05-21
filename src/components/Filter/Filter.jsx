import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import s from './Filter.module.css';

export function Filter({ filter, setFilter }) {
  // const inputId = nanoid();

  return (
    <div className={s.filterWrapper}>
      <label className={s.filterLabel} htmlFor={filter}>
        Find contacts by name
      </label>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        id={filter}
        type="text"
      />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
