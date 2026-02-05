"use client";

import Image from "next/image";
import React from "react";

export default function DataFetch() {
	const [data, setData] = React.useState<string | null>(null);

	const getData = async (): Promise<{ message: string } | null> => {
		return fetch("https://dog.ceo/api/breeds/image/random")
			.then((res) => {
				console.log(res);
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				return res;
			})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err);
				return { data: ["Error fetching data"] };
			});
	};

	React.useEffect(() => {
		getData().then((data) => {
			setData(data?.message ? data.message : null);
			console.log("client data:", data);
		});
	}, []);

	return (
		<div>
			{data && <Image src={data} alt="Random dog image" width={400} height={400} />}
		</div>
	);
}
