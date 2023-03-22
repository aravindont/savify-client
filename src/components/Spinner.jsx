import spinnerImg from "../assets/Loading_icon.gif";
export const Spinner = () => {
  return (
    <div>
      <div>
        <img
          src={spinnerImg}
          alt="spinner"
          className="d-block m-auto"
          style={{ width: "200px" }}
        />
      </div>
    </div>
  );
};
