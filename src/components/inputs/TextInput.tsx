import { useState, ChangeEvent, FC, useEffect } from "react";

interface TextInputProps {
  label: string;
  control: TextInputControl;
  rules?: ((_value: string) => string | null)[];
  showGoodValidation?: boolean;
}

export interface TextInputControlProps {
  initialValue: string;
  onChange: (_value: string) => void;
}

export interface TextInputControl {
  value: string;
  setValue: (_value: string) => void;
  clear: () => void;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  control,
  rules = [],
  showGoodValidation = false,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  useEffect(() => {
    const errorMessages = rules
      .map((rule) => rule(control.value ?? ""))
      .filter((error) => error !== null);

    if (errorMessages.length > 0) {
      setValidationError(errorMessages[0]);
    } else {
      setValidationError(null);
    }
  }, [rules, control.value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    control.setValue(newValue);

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
        value={control.value}
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
