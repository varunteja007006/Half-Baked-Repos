function CustomBadge({ label, customClass }) {
  return (
    <span
      className={`badge font-semibold border-2 rounded-bl-lg rounded-tr-lg rounded-tl-none rounded-br-none border-black bg-slate-200 p-5 ${customClass}`}
    >
      {label || "Click me"}
    </span>
  );
}

export default CustomBadge;
