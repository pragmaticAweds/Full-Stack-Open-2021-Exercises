import React from "react";

import { connect } from "react-redux";

const Notification = ({ notifier }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notifier && <div style={style}>{notifier}</div>;
};

const mapStateToProps = (state) => {
  return {
    notifier: state.notifier,
  };
};

const ConnectedNotifier = connect(mapStateToProps)(Notification);

export default ConnectedNotifier;
