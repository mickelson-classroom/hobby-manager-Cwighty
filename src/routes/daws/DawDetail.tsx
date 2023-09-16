import { useParams } from "react-router-dom";
import daws from "../../assets/daws.json";

export const DawDetail = () => {
  const { dawId: dawId } = useParams<{ dawId: string }>();
  console.log(dawId);
  if (!dawId) {
    return <div>Invalid Daw ID</div>;
  }
  const daw = daws.find((daw) => daw.id === parseInt(dawId));
  if (!daw) {
    return <div>Daw not found</div>;
  }

  return (
    <div className="container border rounded my-3 p-3">
      <div className="row">
        <div className="col-md-6">
          <img
            src={daw.image}
            alt={daw.name}
            className="img-fluid rounded mx-auto d-block"
            style={{ maxHeight: "220px" }}
          />
          <hr />
          <h1>{daw.name}</h1>
          <hr />
          <p>{daw.description}</p>
          <p>
            <strong>Price: </strong>
            <span className="badge bg-success">{daw.price}</span>
          </p>
        </div>
        <div className="col-md-6">
          <h3>Best Features:</h3>
          <ul className="list-group m-3">
            {daw.features.map((feature) => (
              <li className="list-group-item" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
          <h3>Famous Songs:</h3>
          <ul className="list-group m-3">
            {daw.famousSongs.map((song) => (
              <li className="list-group-item" key={song}>
                {song}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
