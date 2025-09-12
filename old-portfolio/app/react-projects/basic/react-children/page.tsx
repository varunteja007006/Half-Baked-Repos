import CodeBlock from "@/components/custom/code-block";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

function ChildComp({ children }: Readonly<{ children: React.ReactNode }>) {
  const customProps = {
    name: "John",
    age: 20,
  };

  // Ensure children is an array and clone them to pass customProps
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Clone the child element and inject customProps
      return React.cloneElement(child, customProps);
    }
    return child; // Return the child unchanged if it's not a valid React element
  });

  return <>{childrenWithProps}</>;
}

function ChildComponent({
  name,
  age,
  message,
}: Readonly<{ name?: string; age?: number; message?: string }>) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-5 w-full h-auto bg-red-300">
      <p className="block">Name: {name}</p>
      <p className="block">Age: {age}</p>
      <p className="block">message: {message}</p>
    </div>
  );
}

function Demo() {
  return (
    <ChildComp>
      <ChildComponent message={"world!!"} />
    </ChildComp>
  );
}

export default function ReactChildren() {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">React Children</h1>
      <div className="space-y-2">
        <p className="inline-flex items-center">
          If you are not familiar with children prop in react please check it
          here,{" "}
          <span className="flex mx-1">
            <Link className="flex" href={`/react#children-props`}>
              <Link2Icon />
            </Link>
          </span>
        </p>
        <p className="text-lg font-semibold">
          Now if there is a case where you receive children as props from parent
          and you want to pass some custom props to the children then how would
          you do it??
        </p>
        <p className="italic ">
          We have a parent component which renders child component (⚠️ not
          children component).
        </p>
        <p className="italic ">
          The child component acts as a wrapper and can accept children as
          props.
        </p>
        <p className="italic ">
          Since the child component is a wrapper it does some weird stuff and
          wants to attach few props to the children. This is where we clone the
          children and inject the custom props. While doing this we just check
          if the children is a valid React element or not.
        </p>
        <p className="font-semibold">Code Snippet:</p>
        <div>
          <CodeBlock
            code={`
    // child component
    
    function ChildComp({ children }: Readonly<{ children: React.ReactNode }>) {
      const customProps = {
        name: "John",
        age: 20,
      };

      // Ensure children is an array and clone them to pass customProps
      const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Clone the child element and inject customProps
          return React.cloneElement(child, customProps);
        }
        return child; // Return the child unchanged if it's not a valid React element
      });

      return <>{childrenWithProps}</>;
    }                

    // children component

    function ChildComponent({
      name,
      age,
      message,
    }: Readonly<{ name?: string; age?: number; message?: string }>) {
      return (
        <div className="flex flex-col gap-2 justify-center items-center p-5 w-full h-auto bg-red-300">
          <p className="block">Name: {name}</p>
          <p className="block">Age: {age}</p>
          <p className="block">message: {message}</p>
        </div>
      );
    }


    // parent component

    function Demo() {
        return (
            <ChildComp>
            <ChildComponent message={"world!!"} />
            </ChildComp>
        );
    }
`}
          />
        </div>
      </div>
      <p className="text-lg font-semibold">Rendered:</p>
      <Demo />
    </div>
  );
}
