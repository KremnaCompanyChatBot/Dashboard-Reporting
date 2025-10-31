import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the dashboard layout", () => {
    render(<App />);
    expect(screen.getByText(/Chatbot Dashboard/i)).toBeInTheDocument();
  });
});
