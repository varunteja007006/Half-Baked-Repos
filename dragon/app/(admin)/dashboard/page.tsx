import React from "react";
import DataFetch from "./_components/datafetch.client";

const getData = async () => {
	return fetch("https://meowfacts.herokuapp.com/?count=3")
		.then((res) => {
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

export default async function Page() {
	const data = await getData();
	console.log("server data:", data);

	return (
		<div className="space-y-10">
			<ul className="list-disc list-inside p-2">
				{data.data.map((fact: string) => {
					return <li key={fact}>{fact}</li>;
				})}
			</ul>
			<div>
				<p className="mb-2">Client</p>
				<DataFetch />
			</div>
		</div>
	);
}
