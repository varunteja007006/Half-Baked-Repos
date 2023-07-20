import { useQuery } from "@tanstack/react-query";

function Homepage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:7000/api/samples").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="p-2 bg-blue-200 border-black border-2">ID</th>
            <th className="p-2 bg-orange-200 border-black border-2">NAME</th>
            <th className="p-2 bg-green-200 border-black border-2">DOB</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border-black border-2 p-2 bg-blue-200">
                {item._id && item._id}
              </td>
              <td className="border-black border-2 p-2 bg-orange-200">
                {item.name && item.name}
              </td>
              <td className="border-black border-2 p-2 bg-green-200">
                {item.dob && item.dob}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Homepage;
