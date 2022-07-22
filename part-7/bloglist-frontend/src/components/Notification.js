const Notification = ({ msg }) => {
  if (!msg) {
    return null;
  }
  return <p style={styles.notify}>{msg}</p>;
};

const styles = {
  notify: {
    padding: "14px",
    background: "lightgrey",
    border: "4px solid green",
    borderRadius: "0.5rem",
    color: "green",
    fontSize: "20px",
  },
};

export default Notification;
