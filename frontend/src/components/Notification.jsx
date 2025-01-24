import Alert from "react-bootstrap/Alert";

const Notification = ({ notification }) => (
  <Alert variant={notification.type}>
    {notification.message ? <Alert.Heading>
      {notification.message}
    </Alert.Heading> : null}
    {notification.messages?.length ? <ul className="mb-0">
      {notification.messages.map((message, i) => (
        <li key={i}>{message}</li>
      ))}
    </ul> : null}
  </Alert>
);

export default Notification;
