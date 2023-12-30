import css from './FeedbackOptions.module.css';
export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  return (
    <div className={css.containerBtn}>
      {options.map(option => (
        <button
          className={css.button}
          type="submit"
          key={option}
          onClick={() => onLeaveFeedback(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
