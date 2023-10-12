export const validateField = <T>(
  value: T,
  validators: ((_value: T) => string | null)[]
): string[] => {
  const errors: string[] = [];
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      errors.push(error);
    }
  }
  return errors;
};
