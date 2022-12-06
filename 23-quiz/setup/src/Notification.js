import React from "react";
import { useGlobalContext } from "./context";

const Notification = () => {
  const { isNotification, notify } = useGlobalContext();
  console.log(isNotification);
  return (
    <div className={` alert alert-${isNotification.type}`}>
      {isNotification.msg}
    </div>
  );
};

export default Notification;
