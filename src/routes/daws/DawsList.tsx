import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TextInput, useTextInput } from "../../components/inputs/TextInput";
import { Daw, DawContextType } from "../../@types/daw";
import { DawContext } from "../../context/dawContext";
import { DawValidationRules } from "./DawValidationRules";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createDaw, fetchDaws } from "../../features/daws/dawsSlice";

export const DawsList = () => {
  const [hasError, setHasError] = useState(false);
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
  const dispatch = useAppDispatch();
  const daws = useAppSelector((state) => state.dawStore.daws);
  useEffect(() => {
    if (hasError) {
      throw new Error("Error thrown from DawsList");
    }
  }, [hasError]);

  useEffect(() => {
    dispatch(fetchDaws());
  }, [dispatch]);

  const nameTextControl = useTextInput({
    initialValue: formData.name,
    onChange: (value) => {
      setFormData({
        ...formData,
        name: value,
      });
    },
  });

  const descriptionTextControl = useTextInput({
    initialValue: formData.description,
    onChange: (value) => {
      setFormData({
        ...formData,
        description: value,
      });
    },
  });

  const priceTextControl = useTextInput({
    initialValue: formData.price,
    onChange: (value) => {
      setFormData({
        ...formData,
        price: value,
      });
    },
  });

  const handleException = () => {
    setHasError(true);
  };

  const handleSave = (e: React.FormEvent, daw: Daw) => {
    e.preventDefault();
    dispatch(createDaw(daw));
    nameTextControl.clear();
    descriptionTextControl.clear();
    priceTextControl.clear();
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

      <div className="border rounded my-3 p-3 bg-dark">
        <h3 className="my-3">Add a DAW</h3>
        <form className="input-form" onSubmit={(e) => handleSave(e, formData)}>
          <div className="mb-3">
            <TextInput
              label={"Name"}
              control={nameTextControl}
              rules={DawValidationRules.name}
            />
            <TextInput
              label={"Description"}
              control={descriptionTextControl}
              rules={DawValidationRules.description}
            />
            <TextInput
              label={"Price"}
              control={priceTextControl}
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
