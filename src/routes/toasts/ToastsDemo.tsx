import { useAppDispatch } from "../../app/hooks";
import {
  addToast,
  dismissAll,
  dismissToast,
  removeAll,
  removeToast,
} from "../../features/toasts/toastSlice";

export const ToastsDemo = () => {
  const dispatch = useAppDispatch();

  const showToast = (message: string, type: string) => {
    const toast = {
      id: Date.now(),
      message,
      type,
    };

    dispatch(addToast(toast));
    setTimeout(() => {
      dispatch(dismissToast(toast.id));
      setTimeout(() => {
        dispatch(removeToast(toast));
      }, 1000);
    }, 5000);
  };

  const add50Toasts = () => {
    for (let i = 0; i < 50; i++) {
      const toast = {
        id: Date.now() + i,
        message: `Toast ${i}`,
        type: "success",
      };
      showToast(toast.message, toast.type);
    }
  };

  const clearAllToasts = () => {
    dispatch(dismissAll());
    setTimeout(() => {
      dispatch(removeAll());
    }, 1000);
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
        <button
          className="btn btn-secondary m-2"
          onClick={() => clearAllToasts()}
        >
          Clear Toasts
        </button>
      </div>
    </div>
  );
};
