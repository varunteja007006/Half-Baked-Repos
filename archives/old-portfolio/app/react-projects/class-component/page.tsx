/*
 * This code is for understanding the class based components and functional components
 * Mixing of functional and class based components
 */

"use client";

import React, { Component } from "react";
import FuncComp from "./FuncComp";
import { Button } from "@/components/ui/button";

interface MyClassCompProps {}

class MyClassComp extends Component<MyClassCompProps, { message: string }> {
  state = {
    message: "This is the initial state message.",
  };

  handleClickClass = () => {
    this.setState({
      message: "The message has been updated by class component!",
    });
  };

  handleClick = () => {
    this.setState({
      message:
        "The message has been updated by functional component via function from class component!",
    });
  };

  handleClickTwo = (args: object) => {
    this.setState(args);
  };

  setStateUtil = () => {
    const obj = this;
    return function (args: object) {
      obj.setState(args);
    };
  };
  handleSetStateUtil = this.setStateUtil();

  render() {
    const { message } = this.state;
    return (
      <div>
        <h3 className="mb-3 text-lg">This is a class component in Next.js</h3>
        <div className="mb-3">
          Message: <p className="">{message}</p>
        </div>
        <p>
          You can use class components in Next.js pages, but functional
          components are generally preferred for their simplicity.
        </p>
        <Button
          className="my-2"
          variant={"secondary"}
          onClick={this.handleClickClass}
        >
          Update in class component
        </Button>
        <h3 className="mb-3 text-lg">Below is a functional component</h3>
        <FuncComp
          message={message}
          handleClick={this.handleClick}
          handleClickTwo={this.handleClickTwo}
          handleSetStateUtil={this.handleSetStateUtil}
          directSetState={this.setState}
        />
      </div>
    );
  }
}

export default MyClassComp;
