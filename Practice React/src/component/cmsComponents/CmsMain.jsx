import React from "react";
import cmsImg from "../../assets/undraw_coding_re_iv62.svg";
import { useFetchProjects } from "./CmsProjects";

function CmsMain() {
  const { loading, projects } = useFetchProjects();
  return (
    <>
      {/* hero part */}
      <div className="flex flex-row gap-5 items-center justify-evenly bg-yellow-500 p-5 dark:bg-slate-600 dark:text-white ">
        <h1 className="text-4xl">CMS Main</h1>
        <img className="w-50 h-40" src={cmsImg} alt="coder" />
      </div>

      <div className="flex flex-wrap gap-4 py-5 px-20 bg-yellow-300 dark:bg-slate-400 dark:text-white">
        {projects.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 w-72 h-fit items-center bg-yellow-500 p-5 dark:bg-slate-600"
            >
              <img className=" w-fit h-56" src={item.img} alt={item.title} />
              <a
                href={item.url}
                className="bg-yellow-300 py-2 px-5 shadow-md rounded-full hover:shadow-xl hover:bg-yellow-200 dark:text-black"
              >
                <h4 className="text-lg"> {item.title.toUpperCase()} </h4>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CmsMain;
