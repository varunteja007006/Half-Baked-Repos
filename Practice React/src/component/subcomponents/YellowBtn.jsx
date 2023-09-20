function YellowBtn({ label, handleButton, type, customClass, disabledStatus }) {
  return (
    <button
      className={`btn font-semibold border-2 border-black bg-yellow-300 hover:bg-yellow-400 hover:border-black ${customClass}`}
      onClick={handleButton}
      type={type}
      disabled={disabledStatus}
    >
      {label || "Click me"}
    </button>
  );
}

export default YellowBtn;
