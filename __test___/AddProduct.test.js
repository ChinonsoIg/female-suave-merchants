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

import AddProduct from "../pages/add-product";


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

const formInputValues = [
  {
    label: 'Name',
    correctTestValue: 'coolguy@gmail.com',
  },
  {
    label: 'Category',
    correctTestValue: '2348143932991',
  },
  {
    label: 'Price',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'Quantity',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'Description',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'Status',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'Add images',
    correctTestValue: 'ASrty6655#$%f',
  },
];


describe('Simple working form', () => {

  it('should render all form inputs', () => {
    render(<AddProduct />);

    formInputValues.forEach((value, index) => {
      expect(screen.getByText(value.label)).toBeInTheDocument();
    })
  });

  
  it('should render submit button', async () => {
    render(<AddProduct />);
  
    //check for submit button
    const button = screen.getByRole('button', { name: 'Submit' });
  
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });


});


