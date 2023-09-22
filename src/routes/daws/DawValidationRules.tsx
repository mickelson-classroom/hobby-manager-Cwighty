import { Daw } from "../../@types/daw";

export const DawValidationRules: {
  [key in keyof Daw]: ((value: any) => string | null)[];
} = {
  id: [(value) => (value ? null : "ID is required")],
  name: [(value) => (value ? null : "Name is required")],
  description: [(value) => (value ? null : "Description is required")],
  website: [(value) => null ],
  image: [(value) =>  null ],
  features: [(value) => null],
  price: [(value) => (value ? null : "Price is required")],
  famousSongs: [(value) => null ],
};

export const validateField = <T,>(
  value: T,
  validators: ((value: T) => string | null)[]
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
