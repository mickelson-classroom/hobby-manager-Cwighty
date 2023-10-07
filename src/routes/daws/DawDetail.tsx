import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddFeatureOrSong } from "./AddFeatureOrSong";
import { Spinner } from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDaws } from "../../features/daws/dawsSlice";
import { DawComments } from "./DawComments";

export const DawDetail = () => {
  const dispatch = useAppDispatch();
  const daws = useAppSelector((s) => s.dawStore.daws);
  const status = useAppSelector((s) => s.dawStore.status);
  const { dawId: dawIdStr } = useParams<{ dawId: string }>();
  const dawId = parseInt(dawIdStr ?? "", 10);

  if (!dawId) {
    return <div>Invalid Daw ID</div>;
  }

  useEffect(() => {
    dispatch(fetchDaws());
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return <div>Error loading daws</div>;
  }

  console.log(daws);
  const daw = daws.find((d) => d.id === dawId);

  if (!daw) {
    return <div>Daw not found</div>;
  }

  return (
    <div className="border rounded my-3 p-3 bg-dark">
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
      <AddFeatureOrSong id={daw.id} />
      <DawComments dawId={daw.id} />
    </div>
  );
};
