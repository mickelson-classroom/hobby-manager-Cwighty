import React, { FC, useEffect } from "react";

export interface Option {
  label: string;
  value: string;
}

interface OptionControlProps {
  initialLabel: string;
  initialOptions: Option[];
  initialValue: string;
  onChange: (value: string) => void;
  initialType: "select" | "radio";
}

interface OptionControl {
  label: string;
  setLabel: (label: string) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
  value: string;
  setValue: (value: string) => void;
  type: "select" | "radio";
  setType: (type: "select" | "radio") => void;
}

export const useOptionInput = ({
  initialLabel,
  initialOptions,
  initialValue,
  onChange,
  initialType,
}: OptionControlProps) => {
  const [value, setValue] = React.useState(initialValue);
  const [label, setLabel] = React.useState(initialLabel);
  const [options, setOptions] = React.useState(initialOptions);
  const [type, setType] = React.useState(initialType);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const output: OptionControl = {
    label,
    setLabel,
    options,
    setOptions,
    value,
    setValue,
    type,
    setType,
  };

  return output;
};

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
