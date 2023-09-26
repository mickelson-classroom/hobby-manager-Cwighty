import { useEffect, useRef } from "react";
import { ToastItem } from "../Toast/ToastItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { dismissToast } from "../../features/toasts/toastSlice";

export const ToastList: React.FC = () => {
  const toasts = useAppSelector((state) => state.toastStore.toasts);
  const dismissedToasts = useAppSelector((state) => state.toastStore.dismissed);
  const dispatch = useAppDispatch();

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
            dismiss={() => dispatch(dismissToast(toast.id))}
            dismissed={dismissedToasts.includes(toast.id)}
          />
        ))}
      </div>
    )
  );
};
