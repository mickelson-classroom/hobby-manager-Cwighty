import React, { useEffect } from "react";
import { OptionControlProps, OptionControl } from "./OptionInput";

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
  }, [onChange, value]);

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
