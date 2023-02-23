import * as React from "react";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import SingleProduct from "../pages/products/[id]";


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


describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  it('false is falsy', () => {
    expect(false).toBe(false);
  });
});


describe("Single Product", () => {

  // For the top section 
  it("renders Single Product on SingleProduct", () => {
    const { getByTestId } = render(<SingleProduct />);
    const headerEl = getByTestId("single-product-header");

    expect(headerEl.textContent).toBe("Single Product");
  });

  // // for image
  // it("renders image on SingleProduct", () => {
  //   const { getByTestId } = render(<SingleProduct />);
  //   const customerEl = getByTestId("customer");

  //   expect(customerEl.textContent).toBe("Customer");
  // });


  it("renders Name on SingleSale", () => {
    render(<SingleProduct />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Name')));
    expect(getByText('Name', { exact: false })).toBeInTheDocument();
  });


  it("renders Category on Sales", () => {
    render(<SingleProduct />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Category')));
    expect(getByText('Category', { exact: false })).toBeInTheDocument();
  });


  it("renders Description on Sales", () => {
    render(<SingleProduct />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Description')));
    expect(getByText('Description', { exact: false })).toBeInTheDocument();
  });


  it("renders Price on SingleProduct", () => {
    render(<SingleProduct />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Price')));
    expect(getByText('Price', { exact: false })).toBeInTheDocument();
  });


  it("renders Quantity on Sales", () => {
    render(<SingleProduct />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Quantity')));
    expect(getByText('Quantity', { exact: false })).toBeInTheDocument();
  });


  it("renders Status on Sales", () => {
    render(<SingleProduct />);
    
    const { getByText } = within(screen.getByText((content, element) => content.startsWith('Status')));
    expect(getByText('Status', { exact: false })).toBeInTheDocument();
  });


});