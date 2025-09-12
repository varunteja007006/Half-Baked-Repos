"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const cartSample1 = ["apple", "banana", "cherry", "date", "elderberry"];

const cartSample2 = ["toyota", "nissan", "honda", "mazda", "subaru"];

export default function SwapTheOdds() {
  const [cart1, setCart1] = React.useState([...cartSample1]);
  const [cart2, setCart2] = React.useState([...cartSample2]);

  const [cart3, setCart3] = React.useState(
    [...cartSample1].map((item) => ({ item, checked: false }))
  );
  const [cart4, setCart4] = React.useState(
    [...cartSample2].map((item) => ({ item, checked: false }))
  );

  const onClickSwap = () => {
    const temp = [...cart1];
    const temp2 = [...cart2];

    for (let i = 0; i < cart1.length; i++) {
      if (i % 2 !== 0) {
        temp[i] = cart2[i];
        temp2[i] = cart1[i];
      }
    }
    setCart1(temp2);
    setCart2(temp);
  };

  const onClickCheckbox1 = (item: number) => {
    const temp = [...cart3];
    temp[item].checked = !temp[item].checked;
    setCart3(temp);
  };

  const onClickCheckbox2 = (item: number) => {
    const temp = [...cart4];
    temp[item].checked = !temp[item].checked;
    setCart4(temp);
  };

  const onClickSwap2 = () => {
    let temp = [...cart3];
    let temp2 = [...cart4];

    for (let i = 0; i < cart3.length; i++) {
      if (temp[i].checked || temp2[i].checked) {
        const cart3Item = temp[i].item;
        const cart4Item = temp2[i].item;

        temp[i].item = cart4Item;
        temp2[i].item = cart3Item;

        temp[i].checked = false;
        temp2[i].checked = false;
      }
    }

    setCart3(temp);
    setCart4(temp2);
  };

  return (
    <div className="border bg-slate-400 p-5 w-fit space-y-6">
      <h1 className="text-lg">Swap the odds</h1>
      <div className="space-y-6">
        <div className="p-2 border bg-slate-200 text-black flex flex-row gap-5">
          {cart1.map((item, index) => (
            <div className="bg-green-300 p-1 px-2 rounded-xl" key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className="p-2 border bg-slate-200 text-black flex flex-row gap-5">
          {cart2.map((item, index) => (
            <div className="bg-yellow-300 p-1 px-2 rounded-xl" key={index}>
              {item}
            </div>
          ))}
        </div>
        <Button onClick={onClickSwap} variant={"destructive"}>
          Swap the odds
        </Button>
      </div>
      <div className="space-y-6">
        <div className="p-2 border bg-slate-200 text-black flex flex-row gap-5">
          {cart3.map((item, index) => (
            <div
              className="bg-green-300 p-1 px-2 rounded-xl flex flex-row items-center gap-2"
              key={item.item}
            >
              {item.item}
              <Checkbox
                checked={item.checked}
                onClick={() => onClickCheckbox1(index)}
              />
            </div>
          ))}
        </div>
        <div className="p-2 border bg-slate-200 text-black flex flex-row gap-5">
          {cart4.map((item, index) => (
            <div
              className="bg-yellow-300 p-1 px-2 rounded-xl flex flex-row items-center gap-2"
              key={item.item}
            >
              {item.item}
              <Checkbox
                checked={item.checked}
                onClick={() => onClickCheckbox2(index)}
              />
            </div>
          ))}
        </div>
        <Button onClick={onClickSwap2} variant={"destructive"}>
          Swap the checked
        </Button>
      </div>
    </div>
  );
}
