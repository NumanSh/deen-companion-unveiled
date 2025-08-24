import { useState } from "react";

export function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  function showToast(msg: string) {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }

  return {
    visible,
    message,
    showToast,
  };
}
