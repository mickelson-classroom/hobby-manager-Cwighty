import { useEffect, useState } from "react";
import { ToastItemProps } from "../../@types/toast";
import "./ToastItem.scss";

export const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type,
  onDismiss,
}) => {
  const iconMap: { [key in ToastItemProps["type"]]: string } = {
    success: "bi-check-circle-fill",
    danger: "bi-x-circle-fill",
    warning: "bi-exclamation-circle-fill",
  };

  const [show, setShow] = useState(false);
  const toastIcon = iconMap[type] || null;

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 50);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 500); // Delay of 500 milliseconds
  };

  return (
    <div
      className={`card border-${type} my-2 shadow-lg toast-item ${
        show ? " show " : ""
      }}`}
      style={{ width: "300px" }}
      role="alert"
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className={`bi ${toastIcon} text-${type}`}></i>
        </div>
        <button className="btn btn-close" onClick={handleDismiss}></button>
      </div>
      <div className="card-body">
        <p className="mb-0 ms-2">{message}</p>
      </div>
    </div>
  );
};
