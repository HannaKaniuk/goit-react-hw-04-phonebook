import css from './ContactList.module.css';

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <li className={css.contactListItem}>
      {name}: {number}{' '}
      <button onClick={() => onRemove(id)} className={css.buttonList}>
        Delete
      </button>
    </li>
  );
};

export const ContactList = ({ contacts, onRemove }) => {
  if (contacts.length === 0) return null;

  return (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} {...contact} onRemove={onRemove} />
      ))}
    </ul>
  );
};
