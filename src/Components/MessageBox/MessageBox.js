import React, { useState } from "react";
import { useAlert } from 'react-alert'
export default function MessageBox(props) {
  const [lastMessage, setMessage] = useState(null);
  const [alert, setAlert] = useState(useAlert());
  if (props.message && (!lastMessage || props.message.id !== lastMessage.id)) {
    if(props.message.isError)
      alert.error(props.message.text)
    else
      alert.success(props.message.text) 
    setMessage(props.message);
  }
  return <div className="errorBox"/>
}