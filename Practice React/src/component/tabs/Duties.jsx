import { FcNext } from "react-icons/fc";

function Duties({ duties }) {
  return (
    <>
      {duties.map((item) => {
        return (
          <div className="flex flex-row p-2">
            <span className="mt-1">
              <FcNext />
            </span>
            <p key="index"> {item}</p>
          </div>
        );
      })}
    </>
  );
}

export default Duties;
