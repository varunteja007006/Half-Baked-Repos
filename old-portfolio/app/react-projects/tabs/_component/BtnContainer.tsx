import { TData } from "../page";

function BtnContainer({
  data,
  currentData,
  setCurrentData,
}: Readonly<{
  data: TData[];
  currentData: number;
  setCurrentData: React.Dispatch<React.SetStateAction<number>>;
}>) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {data?.map((item, index) => {
        return (
          <button
            key={index}
            type="button"
            className={`btn ${
              currentData === index
                ? `bg-green-400 underline hover:bg-green-400 text-black dark:text-black`
                : `bg-slate-300 hover:bg-slate-400 text-black dark:text-black`
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
