import { Link } from "react-router-dom";
import daws from "../../assets/daws.json";
import { ErrorBoundary } from "../../components/ErrorBoundry";
import { useEffect, useState } from "react";

export const DawsList = () => {
  const [hasError, setHasError] = useState(false);

  const handleException = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error("Kaboom!");
    }
  }, [hasError]);

  return (
    <div>
      <h2 className="my-3">
        Digital Audio Workstations
        <button onClick={handleException} className="btn btn-danger ms-3">
          Throw Exception
        </button>
      </h2>
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
    </div>
  );
};
