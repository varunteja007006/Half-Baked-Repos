import { createClient } from "contentful";
import { useEffect, useState } from "react";

// setup the contentful client
const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACEID,
  environment: "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_KEY,
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });
      console.log(projects);
      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //Run to fetch the data from contentful
  useEffect(() => {
    getData();
  }, []);

  return { loading, projects };
};
