import "./BouncingCircles.scss";

export const BouncingCircles = () => {
  return (
    <div className="arrow">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="240.11"
        height="100.9"
        overflow="none"
      >
        <circle
          className="geo-arrow item-to bounce-2"
          cx="194.65"
          cy="69.54"
          r="7.96"
        />
        <circle className="geo-arrow draw-in" cx="194.65" cy="39.5" r="7.96" />
        <circle
          className="geo-arrow item-to bounce-3"
          cx="194.65"
          cy="9.46"
          r="7.96"
        />
      </svg>
    </div>
  );
};
