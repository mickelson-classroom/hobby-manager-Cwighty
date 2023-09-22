import { useContext, useState } from "react";
import { ToastContext } from "../../context/toastContext";
import { ToastContextType } from "../../@types/toast";

export const ToastsDemo = () => {
  const { toasts, addToast, removeToast, removeAllToasts } = useContext(
    ToastContext
  ) as ToastContextType;
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState(5);
  const [position, setPosition] = useState("bottom-right");

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
          className="btn btn-primary"
          onClick={() => showToast("Yay!", "success")}
        >
          Show Success Toast
        </button>
        <button
          className="btn btn-danger"
          onClick={() => showToast("Booo!", "danger")}
        >
          Show Error Toast
        </button>
        <button
          className="btn btn-warning"
          onClick={() => showToast("Meh!", "warning")}
        >
          Show Warning Toast
        </button>
        <button className="btn btn-secondary" onClick={removeAllToasts}>
          Clear Toasts
        </button>
      </div>
    </div>
  );
};
