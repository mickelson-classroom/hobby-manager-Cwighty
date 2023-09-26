import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  addToast,
  dismissToast,
  removeToast,
} from "../features/toasts/toastSlice";

export const ErrorPage = ({ error }: { error: Error }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const toast = {
      id: Date.now(),
      message: error.message,
      type: "danger",
    };
    dispatch(addToast(toast));
    setTimeout(() => {
      dispatch(dismissToast(toast.id));
      setTimeout(() => {
        dispatch(removeToast(toast));
      }, 1000);
    }, 5000);
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
