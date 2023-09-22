import { createContext, useState } from "react";
import { ToastContextType, ToastItemProps } from "../@types/toast";

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItemProps[]>([]);
  const [dissmissedToasts, setDissmissedToasts] = useState<number[]>([]);

  const addToast = (newToast: ToastItemProps) => {
    const id = Date.now();
    newToast.id = id;

    const newToasts = [...toasts, newToast];
    setToasts(newToasts);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const add50Toasts = () => {
    const newToasts: ToastItemProps[] = [];
    for (let i = 0; i < 50; i++) {
      const id = Date.now() + i;
      const toast = {
        id: id,
        message: `Toast ${i}`,
        type: "success",
      };
      newToasts.push(toast);
      setTimeout(() => {
        removeToast(id);
      }, 5000);
    }
    setToasts((toasts) => [...toasts, ...newToasts]);
  };

  const removeToast = (id: number) => {
    setDissmissedToasts((dissmissedToasts) => [...dissmissedToasts, id]);
    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
      setDissmissedToasts((dissmissedToasts) =>
        dissmissedToasts.filter((dissmissedToast) => dissmissedToast !== id)
      );
    }, 500);
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, removeAllToasts, add50Toasts, dissmissedToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
};
