import { Daw } from "../../@types/daw";

export const DawValidationRules: {
  // eslint-disable-next-line no-unused-vars
  [_ in keyof Daw]: ((_value: any) => string | null)[];
} = {
  id: [(value) => (value ? null : "ID is required")],
  name: [(value) => (value ? null : "Name is required")],
  description: [(value) => (value ? null : "Description is required")],
  website: [(_value) => null],
  image: [(_value) => null],
  features: [(_value) => null],
  price: [(value) => (value ? null : "Price is required")],
  famousSongs: [(_value) => null],
};
