import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
    label: 'name',
    correctTestValue: 'coolguy@gmail.com',
  },
  {
    label: 'categoryId',
    correctTestValue: '2348143932991',
  },
  {
    label: 'price',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'quantity',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'description',
    correctTestValue: 'ASrty6655#$%f',
  },
  {
    label: 'status',
    correctTestValue: 'ASrty6655#$%f',
  },
  // {
  //   label: 'add_images',
  //   correctTestValue: 'ASrty6655#$%f',
  // },
];


describe('Simple working form', () => {

  it('should render all form inputs', () => {
    render(<AddProduct />);

    formInputValues.forEach((mockValue, index) => {
      expect(screen.getByTestId(mockValue.label)).toBeInTheDocument();
    })
  });

  
  it('should render submit button', async () => {
    render(<AddProduct />);
  
    //check for submit button
    const button = screen.getByRole('button', { name: 'Submit' });
  
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });


  it('Should submit when submit button is clicked', async () => {
    render(
       <AddProduct />,
    );
  
    //check for submit button
    const submitButton = screen.getByRole('button', { name: 'Submit' });
  
    formInputValues.forEach((mockValue, index) => {
      const input = screen.getByTestId(mockValue.label);
      fireEvent.change(input, { target: { value: mockValue.correctTestValue } });
    });
  
    fireEvent.click(submitButton);
  
    expect(
      await screen.findByRole('button', { name: 'Submitting...' }),
    ).toBeInTheDocument();
  });

});


