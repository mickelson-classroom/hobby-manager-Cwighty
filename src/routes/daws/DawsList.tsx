import { Link } from "react-router-dom";
import daws from "../../assets/daws.json";

export const DawsList = () => {
  return (
    <div>
      <h2 className="my-3">Digital Audio Workstations</h2>
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
