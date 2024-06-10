import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import SignUp from "./sign-up.component";
import configureStore from "redux-mock-store";
import * as router from "react-router";

const initialState = {
  reducer: {
    user: {
      currentUser: {
        firstName: "fdsf",
        lastName: "sdf",
        birthday: "sdf",
        displayName: "sdf",
        email: "sdf@gmail.com",
        phoneNumber: "",
        photoURL: "",
        providerId: "",
        isHost: [],
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        languagesSpoken: [],
        cuisineType: "",
        aboutHost: "",
      },
      isLoading: false,
      error: null,
    },
    experienceFinder: {},
  },
};

let formValue = {
  displayName: "test",
  email: "test@gmail.com",
  password: "123456",
  verifyPassword: "123456",
  isHost: [],
};
// React.useState = jest.fn().mockReturnValue([formValue, {}]);
// React.useState = jest.fn().mockReturnValue([formValue, {}]);

jest.mock("react-redux", () => ({
  useSelector: () => ({
    initialState,
  }),
  useDispatch: () => jest.fn(),
}));

let mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => mockUsedNavigate);
});

const mockStoreConfigure = configureStore();
const store = mockStoreConfigure({ ...initialState });

describe("SignUpComponent tests", () => {
  test("should render SignUp component", async () => {
    render(<SignUp />, { store });
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
