export type ToastItemProps = {
  id: number;
  message: string;
  type: "success" | "danger" | "warning";
  onDismiss?: () => void;
};

export type ToastContextType = {
  toasts: ToastItem[];
  addToast: (toast: Toast) => void;
  removeToast: (id: number) => void;
  removeAllToasts: () => void;
};
