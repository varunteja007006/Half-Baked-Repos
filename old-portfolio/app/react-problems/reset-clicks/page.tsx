"use client";

import * as React from "react";

let order = 0;

export default function ResetClicks() {
  const btnGeneration = Array(9)
    .fill("")
    .map((_, index) => {
      const val = index + 1;
      return {
        id: val,
        visible: val !== 5 && val !== 6 ? true : false,
        order: -1,
        isClicked: false,
      };
    });

  const [state, setState] = React.useState(btnGeneration);

  const handleOnClick = (id: number) => {
    order = order + 1;
    setState((prev) => {
      const newState = [...prev];
      newState[id - 1].isClicked = true;
      newState[id - 1].order = order;
      return newState;
    });
    if (order === 7) restState();
  };

  const restState = async () => {
    const timer = 2000;

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Delay to let the UI render last item clicked");
      }, timer);
    });

    let dupState: {
      id: number;
      visible: boolean;
      order: number;
      isClicked: boolean;
    }[] = [...state].sort((a, b) => b.order - a.order);

    for (let i = 0; i < dupState.length; i++) {
      const ele = dupState[i];
      setTimeout(
        () =>
          setState((prev) =>
            prev.map((item) => {
              if (item.id === ele.id) {
                item.isClicked = false;
                item.order = -1;
              }
              return item;
            })
          ),

        timer * i
      );
    }

    order = 0;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gap: "2px",
      }}
    >
      {state.map((item) => (
        <React.Fragment key={item.id}>
          {item.visible ? (
            <button
              style={{
                border: "1px solid black",
                background: item.isClicked ? "brown" : "gold",
              }}
              onClick={() => item.isClicked || handleOnClick(item.id)}
            >
              {item.id}
            </button>
          ) : (
            <div></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
