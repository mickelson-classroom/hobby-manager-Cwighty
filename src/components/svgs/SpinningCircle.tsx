import "./SpinningCircle.scss";

export const SpinningCircle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="dotted-circle"
      width="352"
      height="352"
      overflow="visible"
    >
      <circle
        cx="176"
        cy="176"
        r="174"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeDasharray="12.921,11.9271"
      />
    </svg>
  );
};
