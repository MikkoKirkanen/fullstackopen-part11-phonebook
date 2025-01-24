import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => (
  <Alert variant={notification.type}>
    {notification.message ? (
      <Alert.Heading>{notification.message}</Alert.Heading>
    ) : null}
    {notification.messages?.length ? (
      <ul className='mb-0'>
        {notification.messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    ) : null}
  </Alert>
)

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
