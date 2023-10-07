import React, { useContext, useEffect } from "react";
import { ToastContextType } from "../@types/toast";
import { ToastContext } from "../context/toastContext";

export const ErrorPage = ({ error }: { error: Error }) => {
  const { addToast } = useContext(ToastContext) as ToastContextType;

  useEffect(() => {
    addToast({
      id: Date.now(),
      message: error.message,
      type: "danger",
    });
  }, [error.message]);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Something went wrong. So soory bout that!</h1>
      <h2>Here are the details:</h2>
      <div className="border border-danger p-3">
        <p className="text-info">{error.message}</p>
        <p className="text-info">{error.stack}</p>
      </div>
    </div>
  );
};
