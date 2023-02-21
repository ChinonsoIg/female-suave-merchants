import * as React from "react";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import Products from "../pages/products";


jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))


describe("Products", () => {
  it("renders All Products on Products", () => {
    const { getByTestId } = render(<Products />);
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("All Products");

  });


  it("renders Product Table on Products", () => {
    render(<Products />);
    expect(screen.getByText('Product Table')).toBeInTheDocument();
  });


  it("renders Name on Products", () => {
    render(<Products />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });


  it("renders Quantity on Products", () => {
    render(<Products />);
    expect(screen.getByText('Quantity')).toBeInTheDocument();
  });


  it("renders Price on Products", () => {
    render(<Products />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Price')));
    expect(getByText('Price', { exact: false })).toBeInTheDocument();

  });


  it("renders Status on Products", () => {
    render(<Products />);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });


});