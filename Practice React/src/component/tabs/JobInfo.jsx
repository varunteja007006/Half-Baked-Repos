import Duties from "./Duties";

function JobInfo({ data, currentData }) {
  const item = data[currentData];

  return (
    <article className="card bg-green-200 p-5 mt-3 border-2 border-green-400">
      <h3 className="p-2 text-lg font-semibold">{item.title}</h3>
      <span className="p-2 text-sm">{item.company}</span>
      <p className="p-2 text-sm">{item.dates}</p>
      <Duties duties={item.duties}></Duties>
    </article>
  );
}

export default JobInfo;
