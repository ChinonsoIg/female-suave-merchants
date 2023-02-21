import * as React from "react";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import Sales from "../pages/sales";


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


describe("Sales", () => {
  it("renders Sales on Sales", () => {
    const { getByTestId } = render(<Sales />);
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("Sales");

  });


  it("renders All Sales on Sales", () => {
    render(<Sales />);
    expect(screen.getByText('All Sales')).toBeInTheDocument();
  });


  it("renders Customer on Sales", () => {
    render(<Sales />);
    expect(screen.getByText('Customer')).toBeInTheDocument();
  });


  it("renders Status on Sales", () => {
    render(<Sales />);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });


  it("renders Shipping Fee on Sales", () => {
    render(<Sales />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Shipping Fee')));
    expect(getByText('Shipping Fee', { exact: false })).toBeInTheDocument();

  });


  it("renders Subtotal on Sales", () => {
    render(<Sales />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Subtotal')));
    expect(getByText('Subtotal', { exact: false })).toBeInTheDocument();
  });


  it("renders Total on Sales", () => {
    render(<Sales />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Total')));
    expect(getByText('Total', { exact: false })).toBeInTheDocument();
  });


});