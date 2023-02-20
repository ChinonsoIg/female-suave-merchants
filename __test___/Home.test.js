import * as React from "react";
import { render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";


import Home from "../pages";


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


describe("Home", () => {
  it("renders Dashboard on Home", () => {

    const { getByTestId } = render(<Home />);
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("Dashboard");

  });


  it("renders Recent Products on Home", () => {

    render(<Home />);
    expect(screen.getByText('Recent Products')).toBeInTheDocument();
  });


  it("renders Sales on Home", () => {

    render(<Home />);
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });


  it("renders Income on Home", () => {

    render(<Home />);
    // expect(screen.getByText('Income')).toBeInTheDocument();

    const { getByText } = within(screen.getByTestId('income'))
    expect(getByText(/Income/)).toBeInTheDocument();
  });


  it("renders Customers on Home", () => {

    render(<Home />);
    expect(screen.getByText('Customers')).toBeInTheDocument();
  });


  it("renders Products on Home", () => {

    render(<Home />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

});

