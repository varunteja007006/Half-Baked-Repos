"use client";

import {
	useSelectedLayoutSegment,
	useSelectedLayoutSegments,
} from "next/navigation";

export default function ActiveSegment({
	layoutName,
}: Readonly<{
	layoutName?: string;
}>) {
	const segment = useSelectedLayoutSegment();
	const segments = useSelectedLayoutSegments();

	return (
		<div className="mb-5 p-2 border border-gray-300 m-2">
      <p className="font-bold text-xl">
        Layout name: {layoutName ? layoutName : "default (root) layout"}
      </p>
			<p>Active segment: {segment}</p>
			<p>Active segments: {segments.length}</p>
      <ul className="list-disc list-inside">
				{segments.map((segment, index) => (
					<li key={index}>{segment}</li>
				))}
			</ul>
		</div>
	);
}
