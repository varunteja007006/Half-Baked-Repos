function BtnContainer({ data, currentData, setCurrentData }) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {data.map((item, index) => {
        return (
          <button
            type="button"
            className={`btn ${
              currentData === index
                ? `bg-green-400 hover:bg-green-400 underline`
                : `bg-slate-300`
            }`}
            onClick={() => setCurrentData(index)}
          >
            {item.company}
          </button>
        );
      })}
    </div>
  );
}

export default BtnContainer;
