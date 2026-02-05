import ActiveSegment from "@/app/_components/ActiveSegement";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ActiveSegment layoutName="marketing" />
			{children}
		</>
	);
}
