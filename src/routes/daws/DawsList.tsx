import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TextInput } from "../../components/TextInput";
import { Daw, DawContextType } from "../../@types/daw";
import { DawContext } from "../../context/dawContext";
import { DawValidationRules } from "./DawValidationRules";

export const DawsList = () => {
  const [hasError, setHasError] = useState(false);
  const { addDaw, daws } = useContext(DawContext) as DawContextType;
  const [formData, setFormData] = useState<Daw>({
    id: 0,
    name: "",
    description: "",
    website: "",
    image: "",
    features: [],
    price: "",
    famousSongs: [],
  });

  useEffect(() => {
    if (hasError) {
      throw new Error("Error thrown from DawsList");
    }
  }, [hasError]);

  const handleException = () => {
    setHasError(true);
  };

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value });
  };

  const handleSave = (e: React.FormEvent, daw: Daw) => {
    e.preventDefault();
    if (!addDaw) return;
    addDaw(daw);
  };

  if (daws === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="my-3">Digital Audio Workstations</h2>
      <button onClick={handleException} className="btn btn-danger">
        Throw Exception
      </button>
      <hr />

      <ul className="list-group">
        {daws.map((daw) => (
          <li key={daw.id} className="list-group-item">
            <Link
              to={`/daw/${daw.id}`}
              className="list-group-item-action fs-4 btn"
            >
              {daw.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border rounded my-3 p-3">
        <h3 className="my-3">Add a DAW</h3>
        <form className="input-form" onSubmit={(e) => handleSave(e, formData)}>
          <div className="mb-3">
            <TextInput
              value={formData.name}
              label={"Name"}
              onChange={handleForm}
              rules={DawValidationRules.name}
            />
            <TextInput
              value={formData.description}
              label={"Description"}
              onChange={handleForm}
              rules={DawValidationRules.description}
            />
            <TextInput
              value={formData.price}
              label={"Price"}
              onChange={handleForm}
              rules={DawValidationRules.price}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={formData === undefined ? true : false}
          >
            Add Daw
          </button>
        </form>
      </div>
    </div>
  );
};
