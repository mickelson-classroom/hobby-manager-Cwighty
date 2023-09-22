import { createContext, useState } from "react";
import { ToastContextType, ToastItemProps } from "../@types/toast";

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);

  const addToast = (newToast: ToastItemProps) => {
    const id = Date.now();
    newToast.id = id;

    const newToasts = [...toasts, newToast];
    setToasts(newToasts);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, removeAllToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
};
