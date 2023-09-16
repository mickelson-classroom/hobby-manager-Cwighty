import React, { useState, ChangeEvent, FC, useEffect } from "react";

interface TextInputProps {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: ((value: string) => string | null)[];
  showGoodValidation?: boolean;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  value,
  onChange,
  rules = [],
  showGoodValidation = false,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  useEffect(() => {
    const errorMessages = rules
      .map((rule) => rule(value ?? ""))
      .filter((error) => error !== null);

    if (errorMessages.length > 0) {
      setValidationError(errorMessages[0]);
    } else {
      setValidationError(null);
    }
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(event);

    const errorMessages = rules
      .map((rule) => rule(newValue))
      .filter((error) => error !== null);

    if (errorMessages.length > 0) {
      setValidationError(errorMessages[0]);
    } else {
      setValidationError(null);
    }
  };

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        type="text"
        name={label.toLowerCase()}
        id={label.toLowerCase()}
        className={`form-control ${
          validationError ? "is-invalid" : "is-valid"
        }`}
        value={value}
        onChange={handleInputChange}
      />
      {validationError && (
        <div className="invalid-feedback">{validationError}</div>
      )}
      {showGoodValidation && !validationError && (
        <div className="valid-feedback">Looks Good!</div>
      )}
    </div>
  );
};
