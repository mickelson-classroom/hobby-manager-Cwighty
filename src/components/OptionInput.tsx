import React, { FC } from "react";

interface Option {
  label: string;
  value: string;
}

interface InputProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  type: "select" | "radio";
}

export const OptionInput: FC<InputProps> = ({
  label,
  options,
  value,
  onChange,
  type,
}) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      {type === "select" ? (
        <select
          className="form-select"
          value={value}
          onChange={handleInputChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="form-check">
          {options.map((option) => (
            <div key={option.value}>
              <input
                className="form-check-input"
                type="radio"
                id={option.value}
                name={label}
                value={option.value}
                checked={option.value === value}
                onChange={handleRadioChange}
              />
              <label className="form-check-label" htmlFor={option.value}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
