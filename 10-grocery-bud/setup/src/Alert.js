import React, { useEffect } from "react";

const Alert = ({ alert, removeAlert, list }) => {
  const { show, type, msg } = alert;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
