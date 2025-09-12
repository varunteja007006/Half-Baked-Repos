import React from "react";
import { FaGithub } from "react-icons/fa6";

export default function GithubLink({
  href,
}: Readonly<{
  href: string;
}>) {
  return (
    <abbr title="View on GitHub">
      <a href={href}>
        <FaGithub className="size-6" />
      </a>
    </abbr>
  );
}
