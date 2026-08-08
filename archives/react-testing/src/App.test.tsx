import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App test", () => {
  test("Check the heading", () => {
    render(<App></App>);
    const titleElem = screen.getByRole("heading");
    expect(titleElem).toBeInTheDocument();
  });

  test("Check the button", () => {
    render(<App />);
    const buttonElem = screen.getByRole("button");
    expect(buttonElem).toBeInTheDocument();
  });

  test("Check the content", () => {
    render(<App />);
    const contentElem = screen.queryByText(/This is the hidden content 😟/i);
    expect(contentElem).not.toBeInTheDocument();
  });

  test("click the button", async () => {
    const user = userEvent.setup();
    render(<App />);
    const buttonElem = screen.getByRole("button");
    await user.click(buttonElem);
    expect(
      screen.queryByText(/This is the hidden content 😟/i)
    ).toBeInTheDocument();
  });
});
