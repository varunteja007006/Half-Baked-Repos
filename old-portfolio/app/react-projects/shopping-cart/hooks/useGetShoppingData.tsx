"use client";
import { useEffect, useState } from "react";

export type TShoppingDataStruct = {
  id: number;
  image: string;
  model: string;
  cost: number;
  quantity: number;
};

function useGetShoppingData() {
  const [shoppingData, setShoppingData] = useState<
    TShoppingDataStruct[] | null
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | unknown>("");

  const getData = async () => {
    try {
      const res = await fetch(`http://localhost:3030/shoppingCart`);
      const data = await res.json();
      setShoppingData(data);
      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { shoppingData, error, isLoading };
}

export default useGetShoppingData;
