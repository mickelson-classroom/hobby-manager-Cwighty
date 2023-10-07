import { useContext, useState } from "react";
import { ToastContext } from "../../context/toastContext";
import { ToastContextType } from "../../@types/toast";

export const ToastsDemo = () => {
  const { addToast, removeAllToasts, add50Toasts } = useContext(
    ToastContext
  ) as ToastContextType;

  const showToast = (message: string, type: string) => {
    const toast = {
      id: Date.now(),
      message,
      type,
    };

    addToast(toast);
  };

  return (
    <div className="app">
      <h1 className="app-title">React Toast Notifications</h1>

      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => showToast("Yay!", "success")}
        >
          Show Success Toast
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={() => showToast("Booo!", "danger")}
        >
          Show Error Toast
        </button>
        <button
          className="btn btn-warning m-2"
          onClick={() => showToast("Meh!", "warning")}
        >
          Show Warning Toast
        </button>
        <button className="btn btn-info m-2" onClick={() => add50Toasts()}>
          Show 50 Toasts
        </button>
        <button className="btn btn-secondary m-2" onClick={removeAllToasts}>
          Clear Toasts
        </button>
      </div>
    </div>
  );
};
