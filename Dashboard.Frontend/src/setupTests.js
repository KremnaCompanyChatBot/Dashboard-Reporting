// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import React from "react";

jest.mock("react-router-dom", () => {
  const createClassName = (className) => {
    if (typeof className === "function") {
      return className({
        isActive: false,
        isPending: false,
        isTransitioning: false,
      });
    }
    return className ?? "";
  };

  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element ?? null,
    NavLink: ({ to, className, children, ...rest }) => (
      <a href={to} className={createClassName(className)} {...rest}>
        {children}
      </a>
    ),
    useNavigate: () => jest.fn(),
  };
}, { virtual: true });

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}), { virtual: true });

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;
