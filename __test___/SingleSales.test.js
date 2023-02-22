import * as React from "react";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import SingleSale from "../pages/sales/[id]";


jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    // user: { username: "admin" }
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


describe("SingleSale", () => {

  // For the top section 
  it("renders Sale Item on SingleSale", () => {
    const { getByTestId } = render(<SingleSale />);
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("Sale Item");
  });


  it("renders Customer on SingleSale", () => {
    const { getByTestId } = render(<SingleSale />);
    const customerEl = getByTestId("customer");

    expect(customerEl.textContent).toBe("Customer");
  });


  it("renders Status on SingleSale", () => {
    const { getByTestId } = render(<SingleSale />);
    const statusEl = getByTestId("status");

    expect(statusEl.textContent).toBe("Status");
  });



  // For the table section
  it("renders Image on Sales", () => {
    render(<SingleSale />);
    expect(screen.getByText('Image')).toBeInTheDocument();
  });


  it("renders Name on Sales", () => {
    render(<SingleSale />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it("renders Price on SingleSale", () => {
    render(<SingleSale />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Price')));
    expect(getByText('Price', { exact: false })).toBeInTheDocument();
  });


  it("renders Quantity on Sales", () => {
    render(<SingleSale />);
    expect(screen.getByText('Quantity')).toBeInTheDocument();
  });



  // For the bottom section
  it("renders Subtotal on Sales", () => {
    render(<SingleSale />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Subtotal')));
    expect(getByText('Subtotal', { exact: false })).toBeInTheDocument();
  });


  it("renders Total on Sales", () => {
    render(<SingleSale />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Total')));
    expect(getByText('Total', { exact: false })).toBeInTheDocument();
  });


});