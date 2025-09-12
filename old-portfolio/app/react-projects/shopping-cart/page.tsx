"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { cartContext } from "./context/cartContext";
import { RiDeleteBinLine } from "react-icons/ri";

function ShoppingCartPage() {
  const {
    isLoading,
    shoppingData,
    totalCartItemsCount,
    totalCartValue,
    clearCart,
    toggleAmount,
  } = React.useContext(cartContext);

  const handleIncrement = (id: number) => {
    toggleAmount(id, "inc");
  };

  const handleDecrement = (id: number) => {
    toggleAmount(id, "dec");
  };

  const handleRemoveAll = () => {
    clearCart();
  };

  if (isLoading) {
    return <>Loading.....</>;
  }

  return (
    <div className="">
      <Card className="">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="mb-2">Shopping Cart</CardTitle>
            <CardDescription>
              Checkout here with your cart items.
            </CardDescription>
          </div>
          <div>
            <Button
              onClick={handleRemoveAll}
              // variant="success"
              className="text-black hover:bg-black hover:text-white"
            >
              <RiDeleteBinLine className="mr-2 w-4 h-4" />
              Remove All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {shoppingData && shoppingData.length > 0 ? (
            <>
              {shoppingData?.map((item) => {
                return (
                  <Card key={item.id} className="mb-2 rounded-sm">
                    <CardContent className="flex flex-row gap-2 justify-between py-2 px-3">
                      <div className="flex flex-row gap-2">
                        <Image
                          src={item.image}
                          width={100}
                          height={100}
                          alt=""
                        />
                        <div className="flex flex-col gap-2 justify-center items-start">
                          <p className="text-lg font-semibold ">{item.model}</p>
                          <p>${item.cost}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 justify-center items-center">
                        <Button
                          onClick={() => handleIncrement(item.id)}
                          variant="outline"
                          size="icon"
                          className="text-black hover:bg-black hover:text-white"
                        >
                          <MdOutlineKeyboardArrowUp className="w-4 h-4 " />
                        </Button>
                        <p>{item.quantity}</p>
                        <Button
                          onClick={() => handleDecrement(item.id)}
                          variant="outline"
                          size="icon"
                          className="text-black hover:bg-black hover:text-white"
                        >
                          <MdOutlineKeyboardArrowDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              <div className="flex flex-col gap-3 justify-end items-end mt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>Total Cart Items: </div>
                  <div className="inline-flex justify-end text-lg font-bold">
                    {totalCartItemsCount}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>Total Cart Value: </div>
                  <div className="inline-flex justify-end text-lg font-bold">
                    ${totalCartValue}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No items</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center items-start">
          <p className="block">All Payments accepted.</p>
          <p className="block">
            Cart empty? Try running the command{" "}
            <span className="py-1 px-2 ml-2 text-sm font-bold leading-loose text-green-500 bg-black">
              `npm run server`
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ShoppingCartPage;
