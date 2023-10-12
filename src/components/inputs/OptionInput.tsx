import React from "react";

export interface Option {
  label: string;
  value: string;
}

export interface OptionControlProps {
  initialLabel: string;
  initialOptions: Option[];
  initialValue: string;
  onChange: (_value: string) => void;
  initialType: "select" | "radio";
}

export interface OptionControl {
  label: string;
  setLabel: (_label: string) => void;
  options: Option[];
  setOptions: (_options: Option[]) => void;
  value: string;
  setValue: (_value: string) => void;
  type: "select" | "radio";
  setType: (_type: "select" | "radio") => void;
}

export const OptionInput = ({ control }: { control: OptionControl }) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    control.setValue(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    control.setValue(event.target.value);
  };

  return (
    <div>
      <label className="form-label">{control.label}</label>
      {control.type === "select" ? (
        <select
          className="form-select"
          value={control.value}
          onChange={handleInputChange}
        >
          {control.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="form-check">
          {control.options.map((option) => (
            <div key={option.value}>
              <input
                className="form-check-input"
                type="radio"
                id={option.value}
                name={control.label}
                value={option.value}
                checked={option.value === control.value}
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
