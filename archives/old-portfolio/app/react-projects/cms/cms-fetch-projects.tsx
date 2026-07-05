"use client";
import { createClient } from "contentful";
import { useEffect, useState } from "react";

export const FetchProjects = ({     
  SPACE_ID,
  ACCESS_KEY,
}: {
  SPACE_ID: string;
  ACCESS_KEY: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any>([]);
  const [error, setError] = useState(null);

  const client = createClient({
    space: SPACE_ID,
    environment: "master",
    accessToken: ACCESS_KEY,
  });

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });
      const projects = response.items.map((item: any) => {
        const {
          title,
          url,
          image,
        }: { title: string; url: string; image: any } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });
      setProjects(projects);
      setLoading(false);
    } catch (error: any) {
      const { message } = { ...error };
      const errorMessage = JSON.parse(message).message;
      setError(errorMessage);
      setLoading(false);
    }
  };

  //Run to fetch the data from contentful
  useEffect(() => {
    getData();
  }, []);

  return { loading, projects, error };
};
