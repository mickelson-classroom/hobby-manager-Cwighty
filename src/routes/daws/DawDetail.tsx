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
    <div>
      <h2>{daw.name}</h2>
      <img src={daw.image} alt={daw.name} />
      <p>{daw.description}</p>
      <p>Price: {daw.price}</p>
      <h3>Best Features:</h3>
      <ul>
        {daw.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <h3>Famous Songs:</h3>
      <ul>
        {daw.famousSongs.map((song) => (
          <li key={song}>{song}</li>
        ))}
      </ul>
    </div>
  );
};
