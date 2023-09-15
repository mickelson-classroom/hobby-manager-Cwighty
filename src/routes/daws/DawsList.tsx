import { Link } from "react-router-dom";
import daws from "../../assets/daws.json";

export const DawsList = () => {
  return (
    <div>
      <h2>Digital Audio Workstations</h2>
      <ul className="list-group">
        {daws.map((daw) => (
          <li key={daw.id} className="list-group-item">
            <Link to={`/daw/${daw.id}`} className="list-group-item-action">
              {daw.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
