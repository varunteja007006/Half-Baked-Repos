"use client";

import { fakeAPI } from "@/constants/api.constants";
import React from "react";

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const LearnUseEffectDemo = () => {
  const [posts, setPosts] = React.useState<Posts[] | null>(null);
  const fetchPosts = async () => {
    try {
      const res: Response = await fetch(fakeAPI, {
        method: "GET",
      });
      const data: Posts[] = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts?.slice(0, 5)?.map((item) => {
        return <p key={item.id}>{item.title}</p>;
      })}
    </div>
  );
};

export default LearnUseEffectDemo;
