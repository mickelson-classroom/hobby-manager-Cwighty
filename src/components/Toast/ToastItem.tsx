import "./ToastItem.scss";
import { useEffect, useState } from "react";
import { ToastItemProps } from "../../@types/toast";

export const ToastItem = ({
  message,
  type,
  dismiss,
  dismissed,
}: ToastItemProps) => {
  // eslint-disable-next-line no-unused-vars
  const iconMap: { [_ in ToastItemProps["type"]]: string } = {
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

  return (
    <div
      className={`card border-${type} my-2 shadow-lg toast-item ${
        show && !dismissed ? " show " : " "
      }}`}
      style={{ width: "300px" }}
      role="alert"
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className={`bi ${toastIcon} text-${type}`}></i>
        </div>
        <p className="mb-0 ms-2">{message}</p>
        <button className="btn btn-close" onClick={dismiss}></button>
      </div>
    </div>
  );
};
