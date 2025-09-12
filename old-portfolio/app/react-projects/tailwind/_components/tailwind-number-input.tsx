"use client";
import React from "react";

export default function TailwindNumberInput() {
  return (
    <div className="space-y-4 ">
      <div>TailwindNumberInput</div>
      <div>
        <input
          type="number"
          min={0}
          className="w-full p-2 lg:w-2/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="how to remove the arrows from the input "
        />
        Remove arrows from the input number field
        <form
          className="p-6 mx-auto mt-8 max-w-md bg-white rounded-lg shadow-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 w-full text-white bg-blue-500 rounded-md transition-colors hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
