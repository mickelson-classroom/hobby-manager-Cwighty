export type ToastItemProps = {
  id: number;
  message: string;
  type: string;
  onDismiss?: () => void;
};

export type ToastContextType = {
  toasts: ToastItem[];
  addToast: (toast: Toast) => void;
  removeToast: (id: number) => void;
  removeAllToasts: () => void;
  add50Toasts: () => void;
};
