import { Toast } from "../components/Toast";
import { ToastItem } from "../components/Toast/ToastItem";

export type ToastItemProps = {
  id: number;
  message: string;
  type: string;
  dismiss?: () => void;
  dismissed?: boolean;
};

export type ToastContextType = {
  toasts: ToastItem[];
  addToast: (_toast: Toast) => void;
  removeToast: (_id: number) => void;
  removeAllToasts: () => void;
  add50Toasts: () => void;
  dissmissedToasts: number[];
};
