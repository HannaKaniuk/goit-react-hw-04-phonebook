import css from './Filter.module.css';
export const Filter = ({ filter, onChange }) => {
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={event => onChange(event)}
      className={css.filterInput}
    />
  );
};
