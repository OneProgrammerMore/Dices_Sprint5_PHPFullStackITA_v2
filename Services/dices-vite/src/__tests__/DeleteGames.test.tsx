import { render, screen, fireEvent } from "@testing-library/react";
import DeleteGames from "../components/DeleteGames";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom/vitest';


describe("DeleteGames (Class Component)", () => {
    it("renders component", () => {
        render(<DeleteGames />);
        expect(screen.getByText("Delete all your games!")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });
}); 

/*
expect(screen.getByText("Modify your name:")).toBeInTheDocument();
        expect(screen.getByText("New Name")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
describe("Counter (Class Component)", () => {
  it("renders initial count", () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });

  it("increments count on button click", () => {
    render(<Counter initialCount={0} />);
    const button = screen.getByText("Increment");

    fireEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
*/