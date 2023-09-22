import { useContext, useEffect, useRef } from "react";
import { ToastContext } from "../../context/toastContext";
import { ToastContextType } from "../../@types/toast";
import { ToastItem } from "../Toast/ToastItem";

export const ToastList: React.FC = () => {
  const { toasts, removeToast } = useContext(ToastContext) as ToastContextType;
  const toastListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastListRef.current) {
      toastListRef.current.scrollTop = toastListRef.current.scrollHeight;
    }
  }, [toasts]);

  return (
    toasts.length > 0 && (
      <div
        className={"position-fixed bottom-0 end-0 p-3"}
        style={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "100vh" }}
        ref={toastListRef}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            message={toast.message}
            id={toast.id}
            type={toast.type}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )
  );
};
