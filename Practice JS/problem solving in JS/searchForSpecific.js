const data = ["My", "Name", "is", "Happy"];
const searchTerm = "pap";

const filterData = data.filter((item) => item.includes(searchTerm));

console.log(filterData.length < 1 ? "No terms found....." : filterData);
