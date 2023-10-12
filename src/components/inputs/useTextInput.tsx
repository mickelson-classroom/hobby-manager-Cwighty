import { useState, useEffect } from "react";
import { TextInputControlProps, TextInputControl } from "./TextInput";

export const useTextInput = ({
  initialValue,
  onChange,
}: TextInputControlProps): TextInputControl => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  const output: TextInputControl = {
    value,
    setValue,
    clear: () => setValue(""),
  };

  return output;
};
