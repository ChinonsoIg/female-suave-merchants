import * as React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import NextLink from "next/link";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react";

import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";


import Component from "../pages";


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
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))


describe("component", () => {
  it("renders Dashboard on Component", () => {

    const { getByTestId } = render(<Component />);
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("Dashboard");

  });


  it("renders Dashboard on Component", () => {

    const { getByTestId } = render(<Component />);
    const headerEl = getByTestId("header");

    expect(headerEl.textContent).toBe("Dashboard");

  });

});

