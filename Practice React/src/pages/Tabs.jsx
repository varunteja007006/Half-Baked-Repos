import axios from "axios";
import { useEffect, useState } from "react";
import BtnContainer from "../components/tabs/BtnContainer";
import JobInfo from "../components/tabs/JobInfo";

function Tabs() {
  const url = "https://course-api.com/react-tabs-project";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentData, setCurrentData] = useState(0);

  const fetchData = () => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <progress className="progress w-56"></progress>
      </>
    );
  }

  return (
    <div>
      <BtnContainer
        data={data}
        currentData={currentData}
        setCurrentData={setCurrentData}
      ></BtnContainer>
      <JobInfo data={data} currentData={currentData}></JobInfo>
    </div>
  );
}

export default Tabs;
