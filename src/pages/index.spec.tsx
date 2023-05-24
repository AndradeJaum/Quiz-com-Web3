import { render, screen } from "@testing-library/react";
import Home from ".";

describe("home", () => {
  it("should render correctly", () => {
    render(
    <Home />
    );

    expect(screen.getByText("QUIZ DO MILHÃO")).toBeInTheDocument();
  });
});
