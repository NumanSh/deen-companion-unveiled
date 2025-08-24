import { useState } from "react";

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  function showToast(msg: string | ToastOptions) {
    const text = typeof msg === 'string' ? msg : msg.title || msg.description || '';
    setMessage(text);
    setVisible(true);
    const duration = typeof msg === 'object' && msg.duration ? msg.duration : 3000;
    setTimeout(() => setVisible(false), duration);
  }

  // Create toast function with different variants
  const toast = (options: ToastOptions | string) => {
    showToast(options);
    return { dismiss: () => setVisible(false) };
  };

  toast.success = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return toast({ title: message, variant: 'default', ...options });
  };

  toast.error = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return toast({ title: message, variant: 'destructive', ...options });
  };

  toast.info = (message: string, options?: Omit<ToastOptions, 'title'>) => {
    return toast({ title: message, variant: 'default', ...options });
  };

  return {
    visible,
    message,
    showToast,
    toast,
  };
}
