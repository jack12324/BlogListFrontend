import PropTypes from 'prop-types';

function Notification({ message, className }) {
  if (message === null) {
    return null;
  }
  return (
    <div className={`notification ${className}`}>
      {message}
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  message: null,
};
export default Notification;
